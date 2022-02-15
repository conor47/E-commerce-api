import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { checkPermissions } from '../utils';
import Order, { SingleCartItem } from '../models/Order';
import Product from '../models/Product';
import { BadRequestError, NotFoundError } from '../errors';

export const getAllOrders = async (req: Request, res: Response) => {
  res.send('Get all orders');
};

export const createOrder = async (req: Request, res: Response) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError('No cart items found');
  }

  if (!tax || !shippingFee) {
    throw new BadRequestError('Please provide tax and shipping fee');
  }

  let orderItems: any[] = [];
  let subTotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError(`No product found with id : ${item.product}`);
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
    subTotal += item.amount * price;
  }

  res.send('create order');
};

export const getSingleOrder = async (req: Request, res: Response) => {
  res.send('get single order');
};

export const updateOrder = async (req: Request, res: Response) => {
  res.send('update order');
};

export const getCurrentUserOrders = async (req: Request, res: Response) => {
  res.send('get current user order');
};
