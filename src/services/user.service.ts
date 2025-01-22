import ConflictError from '../errors/custom/conflict.error.class';
import Users from '../models/users.model';
import User, { UserParams } from '../types/users/user.interface';

const isValidUsername = async (username: string): Promise<boolean> => {
  const user = await Users.findOne({ where: { username } });
  return user != null;
};
const createUser = async (userParams: UserParams): Promise<User> => {
  const bool = await isValidUsername(userParams.username);
  if (bool) {
    throw new ConflictError('username already exists'); //catch the error in the auth controller
  }
  const user = (await Users.create({ ...userParams })) as User;
  return user;
};
const authenticate = async (userParams: UserParams) => {};

export { createUser };
