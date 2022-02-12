import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../models/User';
import { BadRequestError, UnauthenticatedError } from '../errors';
import { attachCookiesToResponse, createTokenUser } from '../utils';

export const registerUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  const emailFound = await User.findOne({ email });
  if (emailFound) {
    throw new BadRequestError('email already exists');
  }

  // first account is an admin
  const isFirst = (await User.countDocuments({})) === 0;
  const role = isFirst ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

export const logoutUser = async (req: Request, res: Response) => {
  res.cookie('token', 'random', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'User logged out' });
};
