//Author: Ashish Ojha (B00931967)
const OrderDAL = require("./orders.dal");

class OrderService {
  constructor() {
    this.orderDAL = new OrderDAL();
  }
  async getOrderById(_id) {
    return await this.orderDAL.getOrderById(_id);
  }
}

module.exports = OrderService;
