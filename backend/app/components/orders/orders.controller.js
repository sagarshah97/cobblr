const OrderService = require("./orders.service");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  async getOrderById(request, response, next) {
    try {
      const _id = request.query._id;
      const order = await this.orderService.getOrderById(_id);
      response.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  async create(request, response, next) {
    try {
      const createdOrderId = await this.orderService.create(request.body);
      response.status(200).json({ _id: createdOrderId });
    } catch (error) {
      next(error);
    }
  }

  async payment(request, response, next) {
    try {
      const paymentStatus = await this.orderService.payment(request.body);
      if (paymentStatus.success === true) {
        response.status(200).json(paymentStatus);
      } else {
        response
          .status(400)
          .json({ error: "Error occurred while making payment." });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
