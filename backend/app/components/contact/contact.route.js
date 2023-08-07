//Author: Ashish Ojha (B00931967)
const express = require("express");

const { verifyToken } = require("../../helpers/jwt");

const ContactController = require("./contact.controller");

const router = express.Router();

// get all faqs
router
  .route("/save")
  .post(verifyToken, ContactController.saveMessage.bind(ContactController));

module.exports = router;
