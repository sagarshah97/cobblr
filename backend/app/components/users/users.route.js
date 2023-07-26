const express = require("express");
const router = express.Router();
const userController = require("./users.controller");
const userValidation = require("./users.validation");
const { validate } = require("../../lib/expressValidation");

router
  .route("/register")
  .post(validate(userValidation.register), userController.register);

router
  .route("/login")
  .post(validate(userValidation.login), userController.login);

router.route("/getUserByUserId").post(
  //validate(userValidation.login),
  userController.getUserById
);

router
  .route("/getWishlistCart")
  .post(
    validate(userValidation.getWishlistCart),
    userController.getWishlistCart
  );

router
  .route("/getUserDetails")
  .post(validate(userValidation.getUserDetails), userController.getUserDetails);

module.exports = router;
