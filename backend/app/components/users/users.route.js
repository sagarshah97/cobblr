const express = require("express");
const router = express.Router();
const userController = require("./users.controller");
const userValidation = require("./users.validation");
const { validate } = require("../../lib/expressValidation");

router
  .route("/register")
  .post(validate(userValidation.register), userController.register);

module.exports = router;
