"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAcceptableError = void 0;
class NotAcceptableError extends Error {
    status = 406;
    payload = {};
    constructor(message, payload = {}) {
        super(message);
        this.payload = payload;
        Object.setPrototypeOf(this, NotAcceptableError.prototype);
    }
}
exports.NotAcceptableError = NotAcceptableError;
