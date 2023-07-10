const Joi = require("joi");

const validationSchema = {
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
  email: Joi.string().min(5).required(),
  password: Joi.string().min(1).required(),
};

module.exports = {
  register: {
    body: Joi.object({
      firstName: validationSchema.firstName,
      lastName: validationSchema.lastName,
      email: validationSchema.email,
      password: validationSchema.password,
    }),
  },
  login: {
    body: Joi.object({
      email: validationSchema.email,
      password: validationSchema.password,
    }),
  },
};
