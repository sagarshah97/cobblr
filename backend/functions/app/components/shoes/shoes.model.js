// Author: Sagar Paresh Shah (B00930009)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Shoe = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    subText: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    availableQuantity: [{ size: String, quantity: Number }],
    images: [{ name: String, data: String }],
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
