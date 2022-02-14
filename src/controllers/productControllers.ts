import { Response, Request } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  res.send('create product');
};

export const getAllProducts = async (req: Request, res: Response) => {
  res.send('get all products');
};

export const getSingleProduct = async (req: Request, res: Response) => {
  res.send('get single product');
};

export const updateProduct = async (req: Request, res: Response) => {
  res.send('update Product');
};

export const deleteProduct = async (req: Request, res: Response) => {
  res.send('delete Product');
};

export const uploadImage = async (req: Request, res: Response) => {
  res.send('upload Image');
};
