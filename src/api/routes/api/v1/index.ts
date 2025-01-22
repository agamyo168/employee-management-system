import express from 'express';
import authRouter from './auth.route';
import employeeRoute from './employees.route';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/employees', employeeRoute);
export default router;
