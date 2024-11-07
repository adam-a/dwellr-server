import type { ErrorRequestHandler } from "express";
import { ValidateError } from "tsoa";

import { BadRequestError } from "./BadRequestError";
import { ForbiddenError } from "./ForbiddenError";
import { NotAcceptableError } from "./NotAcceptableError";
import { NotFoundError } from "./NotFoundError";
import { UnauthorizedError } from "./UnauthorizedError";
import { UnprocessableEntityError } from "./UnprocessableEntityError";

const getErrorDetails = (err: Error) => {
  let status = 500;
  let payload = {};
  if (
    err instanceof BadRequestError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError ||
    err instanceof NotAcceptableError ||
    err instanceof UnprocessableEntityError
  ) {
    status = err.status;
    payload = err.payload;
  }
  if (err instanceof ValidateError) {
    status = err.status;
    payload = err.fields;
  }
  return { status, payload };
};

// next needs to be defined to trigger the error handler overload
export const errorHandler: ErrorRequestHandler = (
  err:
    | ValidateError
    | BadRequestError
    | NotFoundError
    | UnauthorizedError
    | ForbiddenError
    | NotAcceptableError
    | UnprocessableEntityError
    | Error,
  _req,
  res,
  next // eslint-disable-line @typescript-eslint/no-unused-vars
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
  } catch (_e) {
    res.sendStatus(500);
  }
};
