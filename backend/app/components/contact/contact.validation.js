//Author: Ashish Ojha (B00931967)
const Joi = require("joi");

const validationSchema = {
  _id: Joi.string().min(1).required(),
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().min(3).max(100).required(),
  phone: Joi.string().min(3).max(100).required(),
  message: Joi.string().min(3).max(200).required(),
};

module.exports = {
  saveMessage: {
    body: Joi.object({
      name: validationSchema.name,
      email: validationSchema.email,
      phone: validationSchema.phone,
      message: validationSchema.message,
    }),
  },
};
