import Product from '../models/Product';
import { StatusCodes } from 'http-status-codes';
import { Response, Request } from 'express';
import { NotFoundError } from '../errors';
import { send } from 'process';

export const createProduct = async (req: Request, res: Response) => {
  req.body.user = req.user!.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new NotFoundError(`No product with id :${id}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new NotFoundError(`No product with id :${id}`);
  }
  res.status(StatusCodes.OK).send({ product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new NotFoundError(`No product with id :${id}`);
  }
  await product.remove();
  res.status(StatusCodes.OK).send({ msg: 'Success, product removed' });
};

export const uploadImage = async (req: Request, res: Response) => {
  res.send('upload Image');
};
