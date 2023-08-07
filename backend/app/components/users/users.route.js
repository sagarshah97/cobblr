// Author: Sahil Dilip Dalvi (B00939343)
const express = require("express");
const router = express.Router();
const userController = require("./users.controller");
const userValidation = require("./users.validation");
const { validate } = require("../../lib/expressValidation");
const { authenticateJwt, verifyToken } = require("../../helpers/jwt");
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

router.route("/address").post(userController.address);

router.route("/uploadImage").post(userController.uploadImage);

router.route("/forgotpassword").post(userController.forgotpassword);
router.route("/updatepassword").post(userController.updatepassword);
router.route("/getUserByUserId").post(
  //validate(userValidation.login),
  userController.getUserById
);

router
  .route("/getWishlistCart")
  .post(
    verifyToken,
    validate(userValidation.getWishlistCart),
    userController.getWishlistCart
  );

router
  .route("/getUserDetails")
  .post(
    verifyToken,
    validate(userValidation.getUserDetails),
    userController.getUserDetails
  );

module.exports = router;
