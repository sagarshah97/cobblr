const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Shoe = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    subText: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: String, required: true },
    color: { type: String, required: true },
    thumbnail: { type: String },
    sizes: [String],
    quantity: [Number],
    images: [String],
    briefDescription: { type: String, required: true },
    brand: { type: String, required: true },
    tags: [String],
    category: { type: String, required: true },
    gender: { type: String, required: true },
    type: { type: String, required: true },
    material: { type: String, required: true },
    availability: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shoes", Shoe);
