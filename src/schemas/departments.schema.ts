import Joi, { ObjectSchema } from 'joi';

const departmentSchema: ObjectSchema = Joi.object({
  deptName: Joi.string().required(),
});
const departmentQuerySchema: ObjectSchema = Joi.object({
  sortBy: Joi.string(),
  order: Joi.string().valid('ASC', 'DESC', 'asc', 'desc'),
  page: Joi.number(),
  searchTerm: Joi.string(),
});

export { departmentSchema, departmentQuerySchema };
