import { User } from './jwt';

const createTokenUser = (user: any): User => {
  return { name: user.name, userId: user._id, role: user.role };
};

export default createTokenUser;
