export {};
const { StatusCodes } = require('http-status-codes');
const CustomApiError = require('./CustomApiError');

class NotFoundError extends CustomApiError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
