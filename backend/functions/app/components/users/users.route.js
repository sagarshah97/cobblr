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

router.route("/profileupdate").post(verifyToken, userController.profileupdate);

router.route("/displaytext").post(verifyToken, userController.displaytext);

router
  .route("/changepassword")
  .post(verifyToken, userController.changepassword);

router
  .route("/profile-visibility")
  .post(verifyToken, userController.updateProfileVisibility);

router.route("/address").post(verifyToken, userController.address);

router.route("/uploadImage").post(verifyToken, userController.uploadImage);

router.route("/forgotpassword").post(userController.forgotpassword);
router.route("/updatepassword").post(userController.updatepassword);
router.route("/getUserByUserId").post(userController.getUserById);

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
