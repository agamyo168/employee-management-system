import express from 'express';
import authRoute from './auth.route';
import employeeRoute from './employees.route';
import departmentRoute from './departments.route';
import adminPanelRoute from './admin-panel.route';
import authHandlerMiddleware from '../../../../middlewares/auth-handler.middleware';
import { validateBodyMiddleware } from '../../../../middlewares/validation.middleware';
import { userSchema } from '../../../../schemas/user.schema';
import { apiLimiter } from '../../../../middlewares/rate-limiter.middleware';

const router = express.Router();
router.use(apiLimiter);
router.use('/auth', validateBodyMiddleware(userSchema), authRoute);
router.use(
  '/employees',
  authHandlerMiddleware(['admin', 'user']),
  employeeRoute
);
router.use(
  '/departments',
  authHandlerMiddleware(['admin', 'user']),
  departmentRoute
);
router.use(
  '/admin/dashboard',
  authHandlerMiddleware(['admin']),
  adminPanelRoute
);

export default router;
