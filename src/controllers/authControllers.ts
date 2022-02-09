import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../models/User';
import { BadRequestError } from '../errors';
import { createJwt } from '../utils';

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
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = createJwt({ payload: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

export const loginUser = async (req: Request, res: Response) => {
  res.send('Login');
};

export const logoutUser = async (req: Request, res: Response) => {
  res.send('Logout');
};
