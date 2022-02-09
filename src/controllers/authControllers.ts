import { Request, Response } from 'express';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';

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
  res.status(StatusCodes.CREATED).json({ user });
};

export const loginUser = async (req: Request, res: Response) => {
  res.send('Login');
};

export const logoutUser = async (req: Request, res: Response) => {
  res.send('Logout');
};
