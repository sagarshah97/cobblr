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
  profileVisibility: {
    type: Boolean,
    default: false, // Set the default visibility to false (e.g., private)
  },
});

module.exports = mongoose.model("Users", userSchema);
