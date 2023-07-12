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

router.route("/profile/:userId").get(userController.profile);

router.route("/profileupdate").post(userController.profileupdate);

router.route("/displaytext").post(userController.displaytext);

router.route("/changepassword").post(userController.changepassword);

router
  .route("/profile-visibility")
  .post(userController.updateProfileVisibility);

module.exports = router;
