const OrderService = require("./orders.service");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  async getOrderById(request, response, next) {
    try {
      const _id = request.query._id;
      console.log(request);
      const order = await this.orderService.getOrderById(_id);
      response.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
