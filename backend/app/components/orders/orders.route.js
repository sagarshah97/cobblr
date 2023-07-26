/*
 * Author: Ashish Ojha (B00931967)
 */
const express = require("express");
const { validate } = require("../../lib/expressValidation");
const OrderController = require("./orders.controller");
const ordersValidation = require("./orders.validation");

const router = express.Router();
const orderController = new OrderController();

/*
 * Author: Ashish Ojha (B00931967)
 */
router
  .route("/getorder")
  .get(
    validate(ordersValidation.getOrder),
    orderController.getOrderById.bind(orderController)
  );

router
  .route("/makePayment")
  .post(
    validate(ordersValidation.payment),
    orderController.payment.bind(orderController)
  );

router
  .route("/create")
  .post(
    validate(ordersValidation.create),
    orderController.create.bind(orderController)
  );
module.exports = router;
