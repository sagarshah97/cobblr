const OrderHistoryDAL = require("./orderhistory.dal");

class OrderHistoryService {
  constructor() {
    this.orderHistoryDAL = new OrderHistoryDAL();
  }

  async getOrderHistoryForUser(userId) {
    try {
      return await this.orderHistoryDAL.getOrderHistoryForUser(userId);
    } catch (error) {
      throw error;
    }
  }

  async createOrderHistory(orderHistoryData) {
    try {
      return await this.orderHistoryDAL.createOrderHistory(orderHistoryData);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderHistoryService;
