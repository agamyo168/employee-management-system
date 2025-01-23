import { Model } from 'sequelize';
export interface UserParams {
  username: string;
  password: string;
}
export default interface User extends Model {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
  compare(password: string): Promise<boolean>;
  signToken(): string;
}
