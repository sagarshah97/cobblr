//Author: Ashish Ojha (B00931967)
const express = require("express");

const faqController = require("./faq.controller");

const router = express.Router();

// get all faqs
router.route("/getfaq").get(faqController.getFaqs.bind(faqController));

module.exports = router;
