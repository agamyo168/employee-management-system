import Joi, { ObjectSchema } from 'joi';

const employeeSchema: ObjectSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  departmentId: Joi.number().required(),
  hireDate: Joi.date(),
  salary: Joi.number().required(),
});

export { employeeSchema };
