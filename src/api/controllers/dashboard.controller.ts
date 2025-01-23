import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  countEmployees,
  findDepartmentDistribution,
  findRecentEmployees,
} from '../../services/dashboard.service';
const getEmployeeCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Your code here
    const count = await countEmployees();
    res.status(StatusCodes.OK).json({ success: true, count });
  } catch (error) {
    return next(new Error('Failed to get employee count'));
  }
};
const getDepartmentDistribution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Your code here
    const depDistArray = await findDepartmentDistribution();
    res.status(StatusCodes.OK).json({ success: true, depDistArray });
  } catch (error) {
    return next(new Error('Failed to get department distribution'));
  }
};
const getRecentEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Your code here
    const newHires = await findRecentEmployees();
    res.status(StatusCodes.OK).json({ success: true, newHires });
  } catch (error) {
    return next(new Error('Failed to get recent employees'));
  }
};

export { getEmployeeCount, getDepartmentDistribution, getRecentEmployees };
