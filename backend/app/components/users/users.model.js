// user.js

const { number } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  inputText: String,
});

module.exports = mongoose.model("Users", userSchema);
