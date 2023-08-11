//Author: Sagar Paresh Shah (B00930009)
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
  items: Joi.array().required(),
  subtotal: Joi.number().min(0).required(),
  tax: Joi.number().min(0).required(),
  total: Joi.number().min(0).required(),
  paymentMethodId: Joi.string().required(),
};

module.exports = {
  getFinalOrder: {
    body: Joi.object({
      userId: validationSchema._id,
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
      address: validationSchema.address,
      date: validationSchema.date,
      email: validationSchema.email,
      invoiceNumber: validationSchema.invoiceNumber,
      expectedDeliveryDate: validationSchema.date,
      items: validationSchema.items,
      phone: validationSchema.phone,
      subtotal: validationSchema.subtotal,
      tax: validationSchema.tax,
      time: validationSchema.time,
      total: validationSchema.total,
      userId: validationSchema.userId,
    }),
  },
  clearCart: {
    body: Joi.object({
      userId: validationSchema.userId,
    }),
  },
};
