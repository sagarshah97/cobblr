//Author : jayant Patidar

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = new Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    postedBy: { type: String, required: true },
    shoeId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", Review);
