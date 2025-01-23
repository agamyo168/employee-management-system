import { NextFunction, Request, Response } from 'express';
import Departments from '../../models/departments.model';
import logger from '../../helpers/logger';
import { StatusCodes } from 'http-status-codes';
import NotFound from '../../errors/custom/notfound.error.class';
import { Op } from 'sequelize';
interface DepartmentQueryParams {
  sortBy?: string;
  order?: string;
  page?: number;
  searchTerm?: string;
}
const addDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const {name} = req.body; //Validated with JOI --- Bad Request on JOI
    const department = await Departments.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, department });
  } catch (error) {
    logger.error(error);
    return next(new Error('Failed to add department'));
  }
};
const getAllDepartments = async (
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
    }: DepartmentQueryParams = req.query;

    const limit = 10;
    const offset = (page - 1) * limit;

    const departments = await Departments.findAll({
      where: {
        [Op.or]: [{ deptName: { [Op.like]: `%${searchTerm}%` } }],
      },
      limit,
      offset,
      order: [[sortBy, order]],
    });
    res.status(StatusCodes.OK).json({ success: true, departments });
  } catch (error) {
    logger.error(error);
    return next(new Error('Failed to get all departments'));
  }
};
const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await Departments.findByPk(req.params.id);
    if (!department) {
      return next(new NotFound('Department not found'));
    }
    res.status(StatusCodes.OK).json({ success: true, department });
  } catch (error) {
    logger.error(error);
    return next(new Error('Failed to get department by ID'));
  }
};

const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await Departments.findByPk(req.params.id);
    if (!department) {
      return next(new NotFound('Department not found'));
    }
    await department.update(req.body);
    res.status(StatusCodes.OK).json({ success: true, department });
  } catch (error) {
    logger.error(error);
    return next(new Error('Failed to update department'));
  }
};

export {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
};
