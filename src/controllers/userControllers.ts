import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors';

import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
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
  res.send('show current user route');
};
export const updateUser = async (req: Request, res: Response) => {
  res.send(req.body);
};

export const updateUserPassword = async (req: Request, res: Response) => {
  res.send('update single user password route');
};
