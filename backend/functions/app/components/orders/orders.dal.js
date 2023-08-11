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
      // const itemsWithShoeDetails = await Promise.all(
      //   order.items.map(async (item) => {
      //     const shoeDetails = await shoesDAL.getShoe(item.shoeId);
      //     return {
      //       ...item.toObject(),
      //       name: shoeDetails ? shoeDetails.name : null,
      //       image:
      //         shoeDetails && shoeDetails.images.length > 0
      //           ? shoeDetails.images[0]
      //           : null,
      //       subText: shoeDetails ? shoeDetails.subText : null,
      //     };
      //   })
      // );
      // order = order.toObject();
      // order.items = itemsWithShoeDetails;
      return order;
    } catch (error) {
      return null;
    }
  }
}

module.exports = OrderDAL;
