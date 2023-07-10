const Joi = require("joi");

const validationSchema = {
  _id: Joi.string().min(1).required(),
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
  brand: Joi.string().min(3),
  tags: Joi.array().items(Joi.string()),
  category: Joi.string().min(1).required(),
  gender: Joi.string().min(1).required(),
  type: Joi.string().min(1).required(),
  material: Joi.string().min(1).required(),
  availability: Joi.boolean().required(),
};

module.exports = {
  getShoe: {
    body: Joi.object({
      code: validationSchema.code,
    }),
  },
  addShoe: {
    body: Joi.object({
      code: validationSchema.code,
      // name: validationSchema.name,
      // subText: validationSchema.subText,
      // shortDescription: validationSchema.shortDescription,
      // price: validationSchema.price,
      // color: validationSchema.color,
      // sizes: validationSchema.sizes,
      // quantity: validationSchema.quantity,
      // briefDescription: validationSchema.briefDescription,
      // brand: validationSchema.brand,
      // tags: validationSchema.tags,
      // category: validationSchema.category,
      // gender: validationSchema.gender,
      // type: validationSchema.type,
      // material: validationSchema.material,
      // availability: validationSchema.availability,
    }),
  },
  searchShoes: {
    body: Joi.object({
      value: validationSchema.code,
    }),
  },
};
