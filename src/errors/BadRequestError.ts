export {};
const { StatusCodes } = require('http-status-codes');
const CustomApiError = require('./CustomApiError');

class BadRequestError extends CustomApiError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
