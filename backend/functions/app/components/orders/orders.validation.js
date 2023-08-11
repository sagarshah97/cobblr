//Author: Ashish Ojha (B00931967)
const Joi = require("joi");

const validationSchema = {
  _id: Joi.string().min(1).required(),
};

module.exports = {
  getOrder: {
    query: Joi.object({
      _id: validationSchema._id,
    }),
  },
};
