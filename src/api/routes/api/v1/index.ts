import express from 'express';
import authRouter from './auth.route';
import employeeRoute from './employees.route';
import departmentRoute from './departments.route';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/employees', employeeRoute);
router.use('/departments', departmentRoute);

export default router;
