import Joi, { ObjectSchema } from 'joi';

const departmentSchema: ObjectSchema = Joi.object({
  deptName: Joi.string().min(6).required(),
});
const departmentQuerySchema: ObjectSchema = Joi.object({
  sortBy: Joi.string(),
  order: Joi.string().valid('ASC', 'DESC'),
  page: Joi.number(),
  searchTerm: Joi.string(),
});

export { departmentSchema, departmentQuerySchema };
