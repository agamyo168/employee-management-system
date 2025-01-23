import jwt from 'jsonwebtoken';

import Users from '../models/users.model';
import User, { UserParams } from '../types/users/user.interface';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET: JWT, JWT_EXPIRE: EXPIRE } = process.env;

const isValidUsername = async (username: string): Promise<boolean> => {
  const user = await Users.findOne({ where: { username } });
  return user == null;
};
const createUser = async (userParams: UserParams): Promise<User> => {
  const isValid = await isValidUsername(userParams.username);
  if (!isValid) {
    throw new Error('username already exists'); //catch the error in the auth controller
  }
  const user = (await Users.create({ ...userParams })) as User;
  return user;
};
const generateToken = (id: number, role: string) => {
  return jwt.sign({ id, role }, `${JWT}`, {
    expiresIn: `${EXPIRE}`,
  });
};

const authenticate = async (userParams: UserParams) => {
  const user = (await Users.findOne({
    where: { username: userParams.username },
  })) as User;
  const isAuthenticated = user.compare(userParams.password); //false
  if (!isAuthenticated) {
    throw new Error('invalid username or password'); //catch the error in the auth controller
  }
  const token = generateToken(user.id, user.role);
  return token;
};

export { createUser, authenticate };
