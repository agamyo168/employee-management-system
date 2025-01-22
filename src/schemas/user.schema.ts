import Joi, { ObjectSchema } from 'joi';

const userSchema: ObjectSchema = Joi.object({
  username: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
});

export { userSchema };
