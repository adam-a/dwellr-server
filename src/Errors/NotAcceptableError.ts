export class NotAcceptableError extends Error {
  status = 406;
  payload = {};

  constructor(message: string, payload: object = {}) {
    super(message);
    this.payload = payload;
    Object.setPrototypeOf(this, NotAcceptableError.prototype);
  }
}
