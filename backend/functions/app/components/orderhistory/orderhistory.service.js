// Author: Pratik Mukund Parmar (B00934515)

const OrderHistoryDAL = require("./orderhistory.dal");

class OrderHistoryService {
  constructor() {
    this.orderHistoryDAL = new OrderHistoryDAL();
  }

  async getAllOrders() {
    try {
      return await this.orderHistoryDAL.getAllOrders();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderHistoryService;
