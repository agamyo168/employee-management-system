import Joi, { ObjectSchema } from 'joi';

const employeeSchema: ObjectSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  departmentId: Joi.number().required(),
  hireDate: Joi.date(),
  salary: Joi.number().required(),
});
const updateEmployeeSchema: ObjectSchema = Joi.object({
  firstName: Joi.string().min(3),
  lastName: Joi.string().min(3),
  email: Joi.string().email(),
  departmentId: Joi.number(),
  hireDate: Joi.date(),
  salary: Joi.number(),
});
const employeeQuerySchema: ObjectSchema = Joi.object({
  sortBy: Joi.string(),
  order: Joi.string().valid('ASC', 'DESC', 'asc', 'desc'),
  page: Joi.number(),
  searchTerm: Joi.string(),
});
export { employeeSchema, employeeQuerySchema, updateEmployeeSchema };
