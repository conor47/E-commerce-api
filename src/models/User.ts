import { string } from 'joi';
import validator from 'validator';
import mongoose, { Schema, model } from 'mongoose';

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema({
  name: {
    type: string,
    required: [true, 'Please provde name'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: string,
    required: [true, 'Please provde email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: string,
    required: [true, 'Please provde password'],
    minLength: 6,
  },
  role: {
    type: string,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

const UserModel = model<User>('User', UserSchema);
export default UserModel;
