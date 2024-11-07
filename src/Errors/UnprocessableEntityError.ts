export class UnprocessableEntityError extends Error {
  status = 422;
  payload = {};

  constructor(message: string, payload: object = {}) {
    super(message);
    this.payload = payload;
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
  }
}
