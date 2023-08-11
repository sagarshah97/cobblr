// Author: Pratik Mukund Parmar (B00934515)

const mongoose = require("mongoose");
const OrderHistory = require("../orders/orders.model");

class OrderHistoryDAL {
  async getAllOrders() {
    try {
      return await OrderHistory.find({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderHistoryDAL;
