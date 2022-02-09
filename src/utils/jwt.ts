import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

interface payload {
  name: string;
  role: string;
  userId: mongoose.Types.ObjectId;
}

const createJwt = ({ payload }: { payload: payload }): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME!,
  });
  return token;
};

const isTokenValid = ({ token }: { token: string }) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export { createJwt, isTokenValid };
