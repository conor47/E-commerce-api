import CustomApiError from './CustomApiError';
import { StatusCodes } from 'http-status-codes';

class UnauthenticatedError extends CustomApiError {
  private statusCode: number = StatusCodes.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }
}

export default UnauthenticatedError;
