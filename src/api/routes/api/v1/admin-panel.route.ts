import express from 'express';
import {
  getDepartmentDistribution,
  getEmployeeCount,
  getRecentEmployees,
} from '../../../controllers/dashboard.controller';

const router = express.Router();

router.route('/dashboard/employees-count').get(getEmployeeCount);
router
  .route('/dashboard/department-distribution')
  .get(getDepartmentDistribution);
router.route('/dashboard/recent-hires').get(getRecentEmployees);

export default router;
