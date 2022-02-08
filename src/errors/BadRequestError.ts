const { StatusCodes } = require('http-status-codes');
const CustomApiError = require('./CustomApiError');

class BadRequestError extends CustomApiError {
  private statusCode: number = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}

export default BadRequestError;
