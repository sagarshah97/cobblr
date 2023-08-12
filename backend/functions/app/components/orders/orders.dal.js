//Author: Ashish Ojha (B00931967)
const orders = require("./orders.model");
const ShoesDAL = require("../shoes/shoes.dal");

const shoesDAL = new ShoesDAL();

class OrderDAL {
  /*
   * Author: Ashish Ojha (B00931967)
   */
  async getOrderById(_id) {
    try {
      let order = await orders.findById(_id);

      if (!order) {
        return null;
      }

      return order;
    } catch (error) {
      return null;
    }
  }
}

module.exports = OrderDAL;
