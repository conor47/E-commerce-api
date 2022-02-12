import CustomApiError from './CustomApiError';
import { StatusCodes } from 'http-status-codes';

class UnauthorizedError extends CustomApiError {
  private statusCode: number = StatusCodes.FORBIDDEN;

  constructor(message: string) {
    super(message);
  }
}

export default UnauthorizedError;
