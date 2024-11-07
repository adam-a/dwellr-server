export class UnauthorizedError extends Error {
  status = 401;
  payload = {};

  constructor(message: string, payload: object = {}) {
    super(message);
    this.payload = payload;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
