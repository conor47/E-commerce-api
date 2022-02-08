import { UnauthenticatedError } from '../errors';
import { NextFunction, Request, Response } from 'express';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  let token: string = '';

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new UnauthenticatedError('Unauthenticated');
  }

  try {
  } catch (error) {
    throw new UnauthenticatedError('Unauthenticated');
  }
};

export default authenticateUser;
