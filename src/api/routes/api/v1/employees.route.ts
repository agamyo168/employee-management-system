import express from 'express';
import {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from '../../../controllers/employees.controller';

const router = express.Router();
router.route('/').get(getAllEmployees).post(addEmployee);
router
  .route('/:id')
  .get(getEmployeeById)
  .patch(updateEmployee)
  .delete(deleteEmployee);
export default router;
