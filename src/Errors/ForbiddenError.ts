export class ForbiddenError extends Error {
  status = 403;
  payload = {};

  constructor(message: string, payload: object = {}) {
    super(message);
    this.payload = payload;
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
