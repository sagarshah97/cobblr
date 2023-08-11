//Author : Jayant Patidar (B00934519)

const Joi = require("joi");

const validationSchema = {
  shoeId: Joi.string().min(3).max(100).required(),
  rating: Joi.number().min(0).max(5).required(),
  comment: Joi.string().min(3).max(100).required(),
  postedBy: Joi.string().min(3).max(100).required(),
};

module.exports = {
  getReviewByUserId: {
    body: Joi.object({
      postedBy: validationSchema.postedBy,
    }),
  },

  addReview: {
    body: Joi.object({
      postedBy: validationSchema.postedBy,
      rating: validationSchema.rating,
      comment: validationSchema.comment,
      shoeId: validationSchema.shoeId,
    }),
  },

  getReviewIdByShoeId: {
    body: Joi.object({
      shoeId: validationSchema.shoeId,
    }),
  },

  updateReview: {
    body: Joi.object({
      rating: validationSchema.rating,
      comment: validationSchema.comment,
    }),
  },
};
