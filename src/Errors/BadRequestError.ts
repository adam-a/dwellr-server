export class BadRequestError extends Error {
  status = 400;
  payload = {};

  constructor(message: string, payload: object = {}) {
    super(message);
    this.payload = payload;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
