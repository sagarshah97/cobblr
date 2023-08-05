const express = require("express");
const { validate } = require("../../lib/expressValidation");

const billingsController = require("./billings.controller");
const billingsValidation = require("./billings.validation");

const router = express.Router();

router
  .route("/getFinalOrder")
  .post(
    validate(billingsValidation.getFinalOrder),
    billingsController.getFinalOrder.bind(billingsController)
  );

router
  .route("/makePayment")
  .post(
    validate(billingsValidation.payment),
    billingsController.payment.bind(billingsController)
  );

router
  .route("/create")
  .post(
    validate(billingsValidation.create),
    billingsController.create.bind(billingsController)
  );

module.exports = router;
