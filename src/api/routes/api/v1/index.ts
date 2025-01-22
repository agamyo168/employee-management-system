import express from 'express';
import authRoute from './auth.route';
import employeeRoute from './employees.route';
import departmentRoute from './departments.route';

const router = express.Router();
router.use('/auth', authRoute);
router.use('/employees', employeeRoute);
router.use('/departments', departmentRoute);

export default router;
