import express from 'express';
import authRoute from './auth.route';
import employeeRoute from './employees.route';
import departmentRoute from './departments.route';
import authHandlerMiddleware from '../../../../middlewares/auth-handler.middleware';
import { validateBodyMiddleware } from '../../../../middlewares/validation.middleware';
import { userSchema } from '../../../../schemas/user.schema';
import { employeeSchema } from '../../../../schemas/employees.schema';
import { departmentSchema } from '../../../../schemas/departments.schema';
import { apiLimiter } from '../../../../middlewares/rate-limiter.middleware';

const router = express.Router();
router.use('/auth', apiLimiter, validateBodyMiddleware(userSchema), authRoute);
router.use(
  '/employees',
  apiLimiter,
  authHandlerMiddleware(['admin', 'user']),
  validateBodyMiddleware(employeeSchema),
  employeeRoute
);
router.use(
  '/departments',
  apiLimiter,
  authHandlerMiddleware(['admin', 'user']),
  validateBodyMiddleware(departmentSchema),
  departmentRoute
);

export default router;
