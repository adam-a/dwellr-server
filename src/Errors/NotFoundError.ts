export class NotFoundError extends Error {
  status = 404;
  payload = {};

  constructor(message: string, payload: object = {}) {
    super(message);
    this.payload = payload;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
