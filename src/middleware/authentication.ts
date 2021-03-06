import { NextFunction, Request, Response } from 'express';
import { User } from '../utils/jwt';
import { UnauthenticatedError, UnauthorizedError } from '../errors';
import { isTokenValid } from '../utils';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError('Authentication Failed');
  } else {
    try {
      const { name, role, userId } = isTokenValid({ token });
      req.user = { name, role, userId };
    } catch (error) {
      throw new UnauthenticatedError('Authentication Failed');
    }
    next();
  }
};

export const authorizePermissions = (...args: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!args.includes(req.user!.role)) {
      throw new UnauthorizedError('Not authorized to access this route');
    }
    next();
  };
};
