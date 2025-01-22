import express from 'express';
import authRoute from './auth.route';
import employeeRoute from './employees.route';
import departmentRoute from './departments.route';
import authHandlerMiddleware from '../../../../middlewares/auth-handler.middleware';

const router = express.Router();
router.use('/auth', authRoute);
router.use('/employees', authHandlerMiddleware, employeeRoute);
router.use('/departments', authHandlerMiddleware, departmentRoute);

export default router;
