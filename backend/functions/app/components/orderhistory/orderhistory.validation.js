// Author: Pratik Mukund Parmar (B00934515)

const Joi = require("joi");

const orderItemSchema = Joi.object({
  shoeId: Joi.string().required(),
  subText: Joi.string().required(),
  shortDescription: Joi.string().required(),
  name: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  size: Joi.string().required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().required(),
});

const createOrderHistory = {
  body: Joi.object({
    invoiceNumber: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    userId: Joi.string().required(),
    expectedDeliveryDate: Joi.string().required(),
    items: Joi.array().items(orderItemSchema).min(1).required(),
    subtotal: Joi.number().min(0).required(),
    tax: Joi.number().min(0).required(),
    total: Joi.number().min(0).required(),
  }),
};

module.exports = {
  createOrderHistory,
};
