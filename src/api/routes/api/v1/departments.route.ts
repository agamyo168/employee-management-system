import express from 'express';
import {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from '../../../controllers/departments.controller';
import {
  validateBodyMiddleware,
  validateQueryMiddleware,
} from '../../../../middlewares/validation.middleware';
import {
  departmentQuerySchema,
  departmentSchema,
} from '../../../../schemas/departments.schema';

const router = express.Router();
router
  .route('/')
  .get(validateQueryMiddleware(departmentQuerySchema), getAllDepartments)
  .post(validateBodyMiddleware(departmentSchema), addDepartment);
router
  .route('/:id')
  .get(getDepartmentById)
  .patch(validateBodyMiddleware(departmentSchema), updateDepartment);

export default router;
