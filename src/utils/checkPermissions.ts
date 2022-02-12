import { User } from './jwt';
import { Types } from 'mongoose';
import { UnauthorizedError } from '../errors';

const checkPermissions = (reqUser: User, resourceUserId: Types.ObjectId) => {
  if (reqUser.role === 'admin') {
    return;
  }
  if (reqUser.userId.toString() === resourceUserId.toString()) {
    return;
  }
  throw new UnauthorizedError('Not authorized');
};

export default checkPermissions;
