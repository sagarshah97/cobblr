const orders = require("./orders.model");

class OrderDAL {
  async getOrderById(_id) {
    return orders.findById(_id);
  }

  async create(orderDetails) {
    const createdRecord = await orders.create(orderDetails);
    return createdRecord._id;
  }
}

module.exports = OrderDAL;
