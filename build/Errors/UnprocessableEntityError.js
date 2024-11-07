"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityError = void 0;
class UnprocessableEntityError extends Error {
    status = 422;
    payload = {};
    constructor(message, payload = {}) {
        super(message);
        this.payload = payload;
        Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
