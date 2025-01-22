import express from 'express';
import {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from '../../../controllers/departments.controller';

const router = express.Router();
router.route('/').get(getAllDepartments).post(addDepartment);
router.route('/:id').get(getDepartmentById).patch(updateDepartment);

export default router;
