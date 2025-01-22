'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      email: {
        type: DataTypes.STRING,
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
          model: Department, // Reference the Department model
          key: 'id',
        },
      },
      hireDate: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      salary: {
        type: Sequelize.NUMBER,
        allowNull:false,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  },
};
