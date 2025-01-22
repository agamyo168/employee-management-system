import Joi, { ObjectSchema } from 'joi';

const departmentSchema: ObjectSchema = Joi.object({
  deptName: Joi.string().min(6).required(),
});

export { departmentSchema };
