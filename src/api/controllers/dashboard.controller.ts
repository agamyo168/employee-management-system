import { Request, Response, NextFunction } from 'express';
const getEmployeeCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const getDepartmentDistribution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
const getRecentEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { getEmployeeCount, getDepartmentDistribution, getRecentEmployees };
