// Author: Aayush Yogesh Pandya (B00939670)

const express = require("express");

const { verifyToken } = require("../../helpers/jwt");
const { validate } = require("../../lib/expressValidation");

const wishlistController = require("./wishlist.controller");
const wishlistValidation = require("./wishlist.validation");

const router = express.Router();

router
  .route("/getWishlist")
  .post(
    verifyToken,
    validate(wishlistValidation.getWishlistItems),
    wishlistController.getWishlist.bind(wishlistController)
  );

router
  .route("/addItemWishlist")
  .post(
    verifyToken,
    validate(wishlistValidation.addWishlistItem),
    wishlistController.addItemToWishlist.bind(wishlistController)
  );

router
  .route("/removeWishlistItem")
  .post(
    verifyToken,
    validate(wishlistValidation.removeWishlistItem),
    wishlistController.removeWishlistItem.bind(wishlistController)
  );
// router
//   .route("/getSimilarShoes")
//   .post(
//     validate(shoesValidation.getSimilarShoes),
//     shoesController.getSimilarShoes.bind(shoesController)
//   );

// // get single shoe record based on shoe code
// router
//   .route("/getShoe")
//   .post(
//     validate(shoesValidation.getShoe),
//     shoesController.getShoe.bind(shoesController)
//   );

// // create a new shoe record
// router
//   .route("/createShoe")
//   .post(
//     validate(shoesValidation.createShoe),
//     shoesController.createShoe.bind(shoesController)
//   );

module.exports = router;
