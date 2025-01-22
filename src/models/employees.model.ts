import Sequelize from 'sequelize';
import sequelize from '../configs/db-connection.config';
import Departments from './departments.model';

const Employees = sequelize.define('employees', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please provide a valid email',
      },
    },
  },
  departmentId: {
    type: Sequelize.NUMBER,
    allowNull: false,
    references: {
      model: Departments, // Reference the Department model
      key: 'id',
    },
  },
  hireDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  salary: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});
