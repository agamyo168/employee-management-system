import { Request, Response, NextFunction } from 'express';
import Employees from '../../models/employees.model';
import logger from '../../helpers/logger';
import BadRequestError from '../../errors/custom/bad.request.error.class';
import { StatusCodes } from 'http-status-codes';
import NotFound from '../../errors/custom/notfound.error.class';
const addEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await Employees.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, employee });
  } catch (error) {
    logger.error(error);
    return next(new BadRequestError('Failed to add employee')); // Email already exists
  }
};
const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employees = await Employees.findAll();
    res.status(StatusCodes.OK).json({ success: true, employees });
  } catch (error) {
    logger.error(error);
    return next(new Error('Failed to get all employees')); //Internal server error
  }
};
const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employee = await Employees.findByPk(req.params.id);
    if (!employee) {
      return next(new NotFound('Employee not found'));
    }
    res.status(StatusCodes.OK).json({ success: true, employee });
  } catch (error) {
    logger.error(error);
    return next(new Error('Failed to get employee by ID'));
  }
};
const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employee = await Employees.findByPk(req.params.id);
    if (!employee) {
      return next(new NotFound('Employee not found'));
    }
    await employee.update(req.body);
    res.status(StatusCodes.OK).json({ success: true, employee });
  } catch (error) {
    logger.error(error);
    return next(new BadRequestError('Failed to update employee'));
  }
};
const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employee = await Employees.findByPk(req.params.id);
    if (!employee) {
      return next(new NotFound('Employee not found'));
    }
    await employee.destroy();
    res.status(StatusCodes.NO_CONTENT);
  } catch (error) {
    logger.error(error);
    return next(new Error('Failed to delete employee')); // Or Internal Server Error
  }
};

export {
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  addEmployee,
};
