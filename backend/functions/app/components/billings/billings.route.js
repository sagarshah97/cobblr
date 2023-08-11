const express = require("express");
const { validate } = require("../../lib/expressValidation");
const { verifyToken } = require("../../helpers/jwt");
const billingsController = require("./billings.controller");
const billingsValidation = require("./billings.validation");

const router = express.Router();

router
  .route("/getFinalOrder")
  .post(
    verifyToken,
    validate(billingsValidation.getFinalOrder),
    billingsController.getFinalOrder.bind(billingsController)
  );

router
  .route("/makePayment")
  .post(
    verifyToken,
    validate(billingsValidation.payment),
    billingsController.payment.bind(billingsController)
  );

router
  .route("/create")
  .post(
    verifyToken,
    validate(billingsValidation.create),
    billingsController.create.bind(billingsController)
  );

router
  .route("/clearCart")
  .post(
    verifyToken,
    validate(billingsValidation.clearCart),
    billingsController.clearCart.bind(billingsController)
  );

module.exports = router;
