//Author: Ashish Ojha (B00931967)
const OrderService = require("./orders.service");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }
  /*
   * Author: Ashish Ojha (B00931967)
   */
  async getOrderById(request, response, next) {
    try {
      const _id = request.query._id;
      const order = await this.orderService.getOrderById(_id);
      if (order) {
        response.status(200).json(order);
      } else {
        response.status(404).json({ error: "Order not found." });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
