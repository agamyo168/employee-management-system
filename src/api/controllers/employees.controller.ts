import { Request, Response, NextFunction } from 'express';
import { EmployeeParams } from '../../types/employees/employees.interface';
import Employees from '../../models/employees.model';
import logger from '../../helpers/logger';
import BadRequestError from '../../errors/custom/bad.request.error.class';
const addEmployee = async (req: Request, res: Request, next: NextFunction) => {
  try {
    const employee = await Employees.create(req.body);
  } catch (error) {
    logger.error(error);
    return next(new BadRequestError('Failed to add employee')); // Email already exists
  }
};
const getAllEmployees = () => {};

export { addEmployee, getAllEmployees };
