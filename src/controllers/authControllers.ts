import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  res.send('Register');
};

export const loginUser = async (req: Request, res: Response) => {
  res.send('Login');
};

export const logoutUser = async (req: Request, res: Response) => {
  res.send('Logout');
};
