import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { Response } from 'express';

export interface User {
  name: string;
  role: string;
  userId: Types.ObjectId;
}

interface Payload {
  name: string;
  userId: Types.ObjectId;
  role: string;
  iat: number;
  exp: number;
}

const createJwt = ({ payload }: { payload: User }): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME!,
  });
  return token;
};

const isTokenValid = ({ token }: { token: string }) => {
  return jwt.verify(token, process.env.JWT_SECRET!) as User | JwtPayload;
};
``;
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
