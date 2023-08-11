// Author: Pratik Mukund Parmar (B00934515)

const Joi = require("joi");

const validationSchema = {
  _id: Joi.string().min(1).required(),
  cartItem: Joi.object({
    shoeId: Joi.string().min(1).required(),
    quantity: Joi.number().min(1).required(),
  }),
  size: Joi.string().required(),
  cartItemId: Joi.string().min(1).required(),
  quantity: Joi.number().min(0).required(),
};

const updateCartTotalsSchema = {
  userId: Joi.string().min(1).required(),
  subtotal: Joi.number().min(0).required(),
  tax: Joi.number().min(0).required(),
  total: Joi.number().min(0).required(),
};

module.exports = {
  getCart: {
    body: Joi.object({
      userId: validationSchema._id,
    }),
  },
  addToCart: {
    body: Joi.object({
      userId: validationSchema._id,
      cartItem: Joi.object({
        shoeId: validationSchema._id,
        size: validationSchema.size,
        quantity: validationSchema.quantity,
      }),
    }),
  },
  updateCartItemQuantity: {
    body: Joi.object({
      userId: validationSchema._id,
      cartItemId: validationSchema.cartItemId,
      quantity: validationSchema.quantity,
      size: validationSchema.size,
    }),
  },
  removeCartItem: {
    body: Joi.object({
      userId: validationSchema._id,
      cartItemId: validationSchema.cartItemId,
      quantity: validationSchema.quantity,
      size: validationSchema.size,
    }),
  },

  updateCartTotals: {
    body: Joi.object(updateCartTotalsSchema),
  },
};
