import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors';

import { attachCookiesToResponse, createTokenUser } from '../utils';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
  console.log(req.user);

  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

export const getSingleUser = async (req: Request, res: Response) => {
  console.log(req.params);

  const user = await User.findOne({ _id: req.params.id }).select('-password');
  console.log(user);

  if (!user) {
    throw new NotFoundError(`No user with id : ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

export const showCurrentUser = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
export const updateUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new BadRequestError('Please provide both values');
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user!.userId },
    { email, name },
    { new: true, runValidators: true }
  );

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide both values');
  }
  const user = await User.findOne({ _id: req.user!.userId });
  const isPasswordCorrect = await user!.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  user!.password = newPassword;
  await user!.save();
  res.status(StatusCodes.OK).json({ msg: 'Password updated !' });
};
