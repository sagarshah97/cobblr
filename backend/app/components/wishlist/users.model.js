const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Shoe = require("../shoes/shoes.model");

const User = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  wishlistedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: Shoe }],
});

module.exports = mongoose.model("users", User);
