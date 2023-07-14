const OrderDAL = require("./orders.dal");

class OrderService {
  constructor() {
    this.orderDAL = new OrderDAL();
  }

  async getOrderById(_id) {
    return this.orderDAL.getOrderById(_id);
  }
}

module.exports = OrderService;
