// Author: Aayush Yogesh Pandya (B00939670)

const Joi = require("joi");

const validationSchema = {
  _id: Joi.string().min(1).required(),
};

module.exports = {
  getWishlistItems: {
    body: Joi.object({
      _id: validationSchema._id,
    }),
  },
  addWishlistItem: {
    body: Joi.object({
      userId: validationSchema._id,
      itemId: validationSchema._id,
    }),
  },
  removeWishlistItem: {
    body: Joi.object({
      userId: validationSchema._id,
      itemId: validationSchema._id,
    }),
  },
};
