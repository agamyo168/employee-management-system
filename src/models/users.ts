import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/db-connection.config';
import logger from '../helpers/logger';
import { User } from '../types/index';
dotenv.config();
const {
  BCRYPT_SALT_ROUNDS: SALT,
  BCRYPT_SECRET_PEPPER: PEPPER,
  JWT_SECRET: JWT,
  JWT_EXPIRE: EXPIRE,
} = process.env;

const Users = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {},
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'), // Define roles here
      allowNull: false,
      defaultValue: 'user', // Default role
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    compare: {
      type: DataTypes.VIRTUAL,
      get() {
        return async (password: string): Promise<boolean> => {
          return await bcrypt.compare(
            password + PEPPER,
            this.getDataValue('password')
          );
        };
      },
    },
    signToken: {
      type: DataTypes.VIRTUAL,
      get() {
        return () => {
          return jwt.sign(
            { id: this.getDataValue('id'), role: this.getDataValue('role') },
            `${JWT}`,
            {
              expiresIn: `${EXPIRE}`,
            }
          );
        };
      },
    },
  },
  {
    timestamps: true,

    hooks: {
      async beforeCreate(user: User) {
        try {
          const salt = await bcrypt.genSalt(Number(SALT));
          const hashedPassword = await bcrypt.hash(
            `${user.password}${PEPPER}`,
            salt
          );
          user.password = hashedPassword;
        } catch (err) {
          logger.error(err);
        }
      },
      async beforeUpdate(user: User) {
        try {
          const salt = await bcrypt.genSalt(
            Number(process.env.BCRYPT_SALT_ROUNDS)
          );
          const hashedPassword = await bcrypt.hash(
            `${user.password}${process.env.BCRYPT_SECRET_PEPPER}`,
            salt
          );
          user.password = hashedPassword;
        } catch (err) {
          logger.error(err);
        }
      },
    },
  }
);

export default Users;
