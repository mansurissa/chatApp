import Joi from 'joi';

export const validateCreate = (args) => {
  const createValidator = Joi.object({
    userName: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(3).required(),
    password: Joi.string().min(4),
    comfirmPassword: Joi.string().min(4),
  });
  const { error } = createValidator.validate(args);
  if (error) {
    return `Validation error: ${error.details[0].message.replace(/"/g, '')}`;
  }
  return null;
};
