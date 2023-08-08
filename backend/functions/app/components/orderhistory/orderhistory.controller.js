// Author: Pratik Mukund Parmar (B00934515)

const OrderHistoryService = require("./orderhistory.service");

class OrderHistoryController {
  constructor() {
    this.orderHistoryService = new OrderHistoryService();
  }

  async getOrders(req, res, next) {
    try {
      const allOrders = await this.orderHistoryService.getAllOrders();
      res.json({ orders: allOrders });
    } catch (error) {
      next(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new OrderHistoryController();
