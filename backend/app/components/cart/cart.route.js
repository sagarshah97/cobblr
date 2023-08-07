// Author: Pratik Mukund Parmar (B00934515)

const express = require("express");
const router = express.Router();
const cartController = require("./cart.controller");
const cartValidation = require("./cart.validation");
const { verifyToken } = require("../../helpers/jwt");
const { validate } = require("../../lib/expressValidation");

router
  .route("/getCart")
  .post(
    validate(cartValidation.getCart),
    cartController.getCart.bind(cartController)
  );

router
  .route("/updateCartTotals")
  .post(cartController.updateCartTotals.bind(cartController));

router
  .route("/addToCart")
  .post(
    verifyToken,
    validate(cartValidation.addToCart),
    cartController.addToCart.bind(cartController)
  );

router
  .route("/updateCartItemQuantity")
  .post(
    validate(cartValidation.updateCartItemQuantity),
    cartController.updateCartItemQuantity.bind(cartController)
  );

router
  .route("/removeCartItem")
  .post(
    validate(cartValidation.removeCartItem),
    cartController.removeCartItem.bind(cartController)
  );

module.exports = router;
