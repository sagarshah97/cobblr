const Joi = require("joi");

const validationSchema = {
  _id: Joi.string().min(1).required(),
  invoiceNumber: Joi.string().required(),
  date: Joi.date().iso().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().required(),
        name: Joi.string().required(),
        image: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        size: Joi.string().required(),
        price: Joi.number().min(0).required(),
        total: Joi.number().min(0).required(),
      })
    )
    .required(),
  subtotal: Joi.number().min(0).required(),
  tax: Joi.number().min(0).required(),
  total: Joi.number().min(0).required(),
};

module.exports = {
  getOrder: {
    query: Joi.object({
      _id: validationSchema._id,
    }),
  },
};
