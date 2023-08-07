const express = require("express");
const router = express.Router();
const orderHistoryController = require("./orderhistory.controller");
const OrderHistoryValidation = require("./orderhistory.validation");
const { validate } = require("../../lib/expressValidation");

// Define the route for fetching orders
router.route("/getOrders").post(orderHistoryController.getOrders);

// Define the route for creating a new order history
router
  .route("/create")
  .post(
    validate(OrderHistoryValidation.createOrderHistory),
    orderHistoryController.createOrderHistory
  );

module.exports = router;
