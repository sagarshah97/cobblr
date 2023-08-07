const express = require("express");

const { authenticateJwt } = require("../../helpers/jwt");

const faqController = require("./faq.controller");


const router = express.Router();

// get all faqs
router.route("/getfaq").get(faqController.getFaqs.bind(faqController));

module.exports = router;
