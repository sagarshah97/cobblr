const orders = require("./orders.model");

class OrderDAL {
  async getOrderById(_id) {
    return orders.findById(_id);
  }
}

module.exports = OrderDAL;
