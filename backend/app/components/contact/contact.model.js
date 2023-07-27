//Author: Ashish Ojha (B00931967)
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

const messages = mongoose.model("messages", contactSchema);

module.exports = messages;
