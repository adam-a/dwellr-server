"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const tsoa_1 = require("tsoa");
const BadRequestError_1 = require("./BadRequestError");
const ForbiddenError_1 = require("./ForbiddenError");
const NotAcceptableError_1 = require("./NotAcceptableError");
const NotFoundError_1 = require("./NotFoundError");
const UnauthorizedError_1 = require("./UnauthorizedError");
const UnprocessableEntityError_1 = require("./UnprocessableEntityError");
const getErrorDetails = (err) => {
    let status = 500;
    let payload = {};
    if (err instanceof BadRequestError_1.BadRequestError ||
        err instanceof NotFoundError_1.NotFoundError ||
        err instanceof UnauthorizedError_1.UnauthorizedError ||
        err instanceof ForbiddenError_1.ForbiddenError ||
        err instanceof NotAcceptableError_1.NotAcceptableError ||
        err instanceof UnprocessableEntityError_1.UnprocessableEntityError) {
        status = err.status;
        payload = err.payload;
    }
    if (err instanceof tsoa_1.ValidateError) {
        status = err.status;
        payload = err.fields;
    }
    return { status, payload };
};
// next needs to be defined to trigger the error handler overload
const errorHandler = (err, _req, res, next // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
    try {
        const errorDetails = getErrorDetails(err);
        console.error("Error Handler triggered", {
            ...JSON.parse(JSON.stringify(err)),
            errorDetails,
            errorName: err?.constructor?.name,
        });
        return res.status(errorDetails.status).json({
            ...errorDetails.payload,
            message: err.message,
            status: errorDetails.status,
        });
    }
    catch (_e) {
        res.sendStatus(500);
    }
};
exports.errorHandler = errorHandler;
