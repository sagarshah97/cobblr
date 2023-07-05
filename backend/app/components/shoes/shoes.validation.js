const Joi = require("joi");

const validationSchema = {
  code: Joi.string().min(1).required(),
  name: Joi.string().min(3).max(100).required(),
  subText: Joi.string().min(3).required(),
  shortDescription: Joi.string().min(3).required(),
  price: Joi.string().min(3).max(10).required(),
  color: Joi.string().min(1).max(100).required(),
  thumbnail: Joi.string().min(3),
  sizes: Joi.array().items(Joi.string()),
  quantity: Joi.array().items(Joi.number()),
  images: Joi.array().items(Joi.string()),
  briefDescription: Joi.string().min(3).required(),
};

module.exports = {
  getShoe: {
    body: Joi.object({
      code: validationSchema.code,
    }),
  },
  createShoe: {
    body: Joi.object({
      code: validationSchema.code,
      name: validationSchema.name,
      subText: validationSchema.subText,
      shortDescription: validationSchema.shortDescription,
      price: validationSchema.price,
      color: validationSchema.color,
      thumbnail: validationSchema.thumbnail,
      sizes: validationSchema.sizes,
      quantity: validationSchema.quantity,
      images: validationSchema.images,
      briefDescription: validationSchema.briefDescription,
    }),
  },
};
