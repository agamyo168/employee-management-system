import express from 'express';
import {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from '../../../controllers/employees.controller';
import { validateBodyMiddleware } from '../../../../middlewares/validation.middleware';
import { employeeSchema } from '../../../../schemas/employees.schema';

const router = express.Router();

router
  .route('/')
  .get(getAllEmployees)
  .post(validateBodyMiddleware(employeeSchema), addEmployee);
router
  .route('/:id')
  .get(getEmployeeById)
  .patch(validateBodyMiddleware(employeeSchema), updateEmployee)
  .delete(deleteEmployee);
export default router;
