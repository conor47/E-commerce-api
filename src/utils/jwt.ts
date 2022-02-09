import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Response } from 'express';

interface User {
  name: string;
  role: string;
  userId: mongoose.Types.ObjectId;
}

const createJwt = ({ payload }: { payload: User }): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME!,
  });
  return token;
};

const isTokenValid = ({ token }: { token: string }) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

const attachCookiesToResponse = ({
  res,
  user,
}: {
  res: Response;
  user: User;
}) => {
  const token = createJwt({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

export { createJwt, isTokenValid, attachCookiesToResponse };
