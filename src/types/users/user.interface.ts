import { Model } from 'sequelize';

export default interface User extends Model {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
  compare(password: string): Promise<boolean>;
  signToken(): string;
}
