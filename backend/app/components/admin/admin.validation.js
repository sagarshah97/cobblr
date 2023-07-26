const Joi = require("joi");

const validationSchema = {
  _id: Joi.string().min(1).required(),
  _ids: Joi.array().items(Joi.string()),
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
  sortValue: Joi.string()
    .valid("sort1", "sort2", "sort3")
    .default("sort1")
    .required(),
  selectedFilters: Joi.object().pattern(/^.*$/, Joi.string()),
  currentPage: Joi.number().default(1).optional(),
  searchKeyword: Joi.string().allow("", null).optional(),
  pageChangeType: Joi.string().allow("", null).optional(),
  value: Joi.string().min(0),
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
      name: validationSchema.name,
      subText: validationSchema.subText,
      shortDescription: validationSchema.shortDescription,
      price: validationSchema.price,
      color: validationSchema.color,
      availableQuanity: Joi.array(),
      images: validationSchema.images,
      briefDescription: validationSchema.briefDescription,
      brand: validationSchema.brand,
      tags: validationSchema.tags,
      category: validationSchema.category,
      gender: validationSchema.gender,
      type: validationSchema.type,
      material: validationSchema.material,
      availability: validationSchema.availability,
    }),
  },
  searchShoes: {
    body: Joi.object({
      value: validationSchema.value,
    }),
  },
};
