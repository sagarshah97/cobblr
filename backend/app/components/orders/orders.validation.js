//Author: Ashish Ojha (B00931967)
const Joi = require("joi");

const validationSchema = {
  _id: Joi.string().min(1).required(),
  invoiceNumber: Joi.string().required(),
  date: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
  userId: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        image: Joi.object({
          name: Joi.string().required(),
          data: Joi.string().required(),
        }),
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
  paymentMethodId: Joi.string().required(),
};

module.exports = {
  getOrder: {
    query: Joi.object({
      _id: validationSchema._id,
    }),
  },
  payment: {
    body: Joi.object({
      paymentMethodId: validationSchema.paymentMethodId,
      amount: validationSchema.total,
    }),
  },
  create: {
    body: Joi.object({
      invoiceNumber: validationSchema.invoiceNumber,
      date: validationSchema.date,
      time: validationSchema.time,
      address: validationSchema.address,
      phone: validationSchema.phone,
      email: validationSchema.email,
      userId: validationSchema.userId,
      items: validationSchema.items,
      subtotal: validationSchema.subtotal,
      tax: validationSchema.tax,
      total: validationSchema.total,
    }),
  },
};
