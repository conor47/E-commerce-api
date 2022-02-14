import validator from 'validator';
import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  _id: mongoose.Types.ObjectId;
  comparePassword: (candidate: string) => boolean;
}

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: [true, 'Please provde name'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provde email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provde password'],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

//pre save hook for hashing pashwords
UserSchema.pre('save', async function () {
  console.log(this.modifiedPaths());

  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidate: string) {
  const isMatch = await bcrypt.compare(candidate, this.password);
  return isMatch;
};

const UserModel = model<User>('User', UserSchema);
export default UserModel;
