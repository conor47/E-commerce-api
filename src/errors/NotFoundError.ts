import CustomApiError from './CustomApiError';
import { StatusCodes } from 'http-status-codes';
class NotFoundError extends CustomApiError {
  private statusCode: number = StatusCodes.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }
}

export default NotFoundError;
