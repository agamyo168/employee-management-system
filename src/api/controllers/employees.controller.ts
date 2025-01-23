import { Request, Response, NextFunction } from 'express';
import Employees from '../../models/employees.model';
import logger from '../../helpers/logger';
import BadRequestError from '../../errors/custom/bad.request.error.class';
import { StatusCodes } from 'http-status-codes';
import NotFound from '../../errors/custom/notfound.error.class';
import { Op } from 'sequelize';

interface EmployeeQueryParams {
  sortBy?: string;
  order?: string;
  page?: number;
  searchTerm?: string;
}
const addEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await Employees.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, employee });
  } catch (error) {
    logger.error(error);
    return next(new BadRequestError('Failed to add employee')); // Email already exists or Department not found
  }
};
const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = 1,
      sortBy = 'id',
      order = 'ASC',
      searchTerm = '',
    }: EmployeeQueryParams = req.query;

    //Sorting, filtering and pagination logic here
    const limit = 10;
    const offset = (page - 1) * limit;
    const employees = await Employees.findAll({
      where:
        searchTerm.trim() === ''
          ? {}
          : {
              [Op.or]: [
                { firstName: { [Op.like]: `%${searchTerm}%` } },
                { lastName: { [Op.like]: `%${searchTerm}%` } },
                { email: { [Op.like]: `%${searchTerm}%` } },
              ],
            },
      limit,
      offset,
      order: [[sortBy, order]],
    });

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
    res.status(StatusCodes.OK).json({ success: true });
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
