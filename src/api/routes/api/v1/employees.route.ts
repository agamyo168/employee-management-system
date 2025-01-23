import express from 'express';
import {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from '../../../controllers/employees.controller';
import {
  validateBodyMiddleware,
  validateQueryMiddleware,
} from '../../../../middlewares/validation.middleware';
import {
  employeeQuerySchema,
  employeeSchema,
  updateEmployeeSchema,
} from '../../../../schemas/employees.schema';

const router = express.Router();

router
  .route('/')
  .get(validateQueryMiddleware(employeeQuerySchema), getAllEmployees)
  .post(validateBodyMiddleware(employeeSchema), addEmployee);
router
  .route('/:id')
  .get(getEmployeeById)
  .patch(validateBodyMiddleware(updateEmployeeSchema), updateEmployee)
  .delete(deleteEmployee);
export default router;
