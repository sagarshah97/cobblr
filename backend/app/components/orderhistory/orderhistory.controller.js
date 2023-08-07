const { body, validationResult } = require("express-validator");
const OrderHistoryValidation = require("./orderhistory.validation");
const OrderHistoryService = require("./orderhistory.service");
const OrderHistoryDAL = require("./orderhistory.dal");

class OrderHistoryController {
  constructor() {
    this.orderHistoryService = new OrderHistoryService();
  }

  async getOrders(req, res) {
    try {
      const { userId } = req.body;
      console.log(userId);
      const orderHistory =
        await this.orderHistoryService.getOrderHistoryForUser(userId);
      res.json(orderHistory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  async createOrderHistory(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const orderHistoryData = req.body;
      const newOrderHistory = await this.orderHistoryService.createOrderHistory(
        orderHistoryData
      );
      res.status(201).json(newOrderHistory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

// const orderHistoryController = new OrderHistoryController();

module.exports = OrderHistoryController;
