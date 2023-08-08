// Author: Pratik Mukund Parmar (B00934515)

const express = require("express");
const router = express.Router();
const orderHistoryController = require("./orderhistory.controller");

router
  .route("/getOrders")
  .get(orderHistoryController.getOrders.bind(orderHistoryController));

module.exports = router;
