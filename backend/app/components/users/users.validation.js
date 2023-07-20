const Joi = require("joi");

const validationSchema = {
  _id: Joi.string().min(1).required(),
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
  email: Joi.string().min(5).required(),
  password: Joi.string().min(1).required(),
  wishlist: Joi.array().items(Joi.string()),
  cart: Joi.array().items(Joi.string()),
  wishlistedItem: Joi.string().min(1).required(),
  selectedItem: Joi.object({
    shoeId: Joi.string().required(),
    size: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
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
  getWishlistCart: {
    body: Joi.object({
      _id: validationSchema._id,
    }),
  },
  addToWishlist: {
    body: Joi.object({
      _id: validationSchema._id,
      wishlistedItem: validationSchema.wishlistedItem,
    }),
  },
  addToCart: {
    body: Joi.object({
      _id: validationSchema._id,
      selectedItem: validationSchema.selectedItem,
    }),
  },
  getUserDetails: {
    body: Joi.object({
      _id: validationSchema._id,
    }),
  },
};
