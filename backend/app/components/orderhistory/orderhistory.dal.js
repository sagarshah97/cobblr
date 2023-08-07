const mongoose = require("mongoose");
const OrderHistory = require("../orders/orders.model");

class OrderHistoryDAL {
  async getOrderHistoryForUser(userId) {
    try {
      return await OrderHistory.find({ userId });
    } catch (error) {
      throw error;
    }
  }

  async createOrderHistory(orderHistoryData) {
    try {
      return await OrderHistory.create(orderHistoryData);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderHistoryDAL;
