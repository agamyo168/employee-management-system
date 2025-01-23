import Joi, { ObjectSchema } from 'joi';

const employeeSchema: ObjectSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  departmentId: Joi.number().required(),
  hireDate: Joi.date(),
  salary: Joi.number().required(),
});
const employeeQuerySchema: ObjectSchema = Joi.object({
  sortBy: Joi.string(),
  order: Joi.string().valid('ASC', 'DESC'),
  page: Joi.number(),
  searchTerm: Joi.string(),
});
export { employeeSchema, employeeQuerySchema };
