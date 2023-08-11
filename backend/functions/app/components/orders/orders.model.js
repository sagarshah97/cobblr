//Author: Ashish Ojha (B00931967)
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  expectedDeliveryDate: {
    type: String,
    required: true,
  },
  items: [
    {
      shoeId: { type: mongoose.Types.ObjectId, required: true },
      subText: {
        type: String,
        required: true,
      },
      shortDescription: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      images: { name: String, data: String },
      name: {
        type: String,
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
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("orders", orderSchema);
