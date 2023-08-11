//Author : jayant Patidar

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Store = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stores", Store);
