const express = require("express");

const { authenticateJwt } = require("../../helpers/jwt");

const ContactController = require("./contact.controller");


const router = express.Router();

// get all faqs
router.route("/save").post(ContactController.saveMessage.bind(ContactController));

module.exports = router;
