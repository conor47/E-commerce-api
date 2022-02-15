import { string } from 'joi';
import { Schema, model, Types } from 'mongoose';
import { Product } from './Product';
import { User } from './User';

export interface Order {
  tax: number;
  shippingFee: number;
  subtotal: number;
  total: number;
  cartItems: string[];
  user: User;
  clientSecret: string;
  paymentIntentId: string;
  status: string;
}

export interface SingleCartItem {
  name: string;
  image: string;
  price: number;
  amount: number;
  product: Product;
}

const SingleCartItemSchema = new Schema<SingleCartItem>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: { type: Types.ObjectId, required: true, ref: 'Product' },
});

const OrderSchema = new Schema<Order>(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    cartItems: [],
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'cancelled', 'delivered'],
      default: 'pending',
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

const OrderModel = model<Order>('Order', OrderSchema);
export default OrderModel;
