// user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    },
    tax: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("Users", userSchema);
