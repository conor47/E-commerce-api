import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { checkPermissions } from '../utils';
import Order, { SingleOrderItem } from '../models/Order';
import Product from '../models/Product';
import { BadRequestError, NotFoundError } from '../errors';

const fakeStripeApi = async ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  const client_Secret = 'asdnaiusdbn928';
  return { client_Secret, amount };
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
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

  const total = tax + shippingFee + subTotal;
  const paymentIntent = await fakeStripeApi({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    orderItems,
    total,
    subTotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_Secret,
    user: req.user?.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

export const getSingleOrder = async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`Order not found with id : ${orderId}`);
  }
  checkPermissions(req.user!, order.user._id);
  res.status(StatusCodes.OK).json({ order });
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const { parmentIntentId } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`Order not found with id : ${orderId}`);
  }
  checkPermissions(req.user!, order.user._id);
  order.paymentIntentId = parmentIntentId;
  order.status = 'paid';
  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

export const getCurrentUserOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user?.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
