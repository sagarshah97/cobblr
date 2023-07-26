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
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,
  label: String,
  forgotPasswordToken: String,
  profileImage: {
    type: String, // Store the image as a string
  },
});

module.exports = mongoose.model("Users", userSchema);
