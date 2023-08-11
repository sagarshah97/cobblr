// Author: Sahil Dilip Dalvi (B00939343)

const { number } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  inputText: String,
  profileVisibility: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,
  label: String,
  forgotPasswordToken: String,
  profileImage: {
    type: String,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: [String],
  address: [String],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shoe",
    },
  ],
  cart: {
    items: [
      {
        shoeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Shoe",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = mongoose.model("Users", userSchema);
