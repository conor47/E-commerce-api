import { StatusCodes } from 'http-status-codes';
import CustomApiError from './CustomApiError';
class BadRequestError extends CustomApiError {
  private statusCode: number = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}

export default BadRequestError;
