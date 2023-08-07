//Author: Ashish Ojha (B00931967)
const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  questions: [
    {
      id: { type: Number, required: true },
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
});

const Faq = mongoose.model("Faq", faqSchema, "faq");

module.exports = Faq;
