// Author: Sagar Paresh Shah (B00930009)
const mongoose = require("mongoose");
const Users = require("../users/users.model");
const Orders = require("../orders/orders.model");

class BillingsDAL {
  async getFinalOrder(userId) {
    const cartDetails = await Users.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$cart.items",
      },
      {
        $lookup: {
          from: "shoes",
          localField: "cart.items.shoeId",
          foreignField: "_id",
          as: "shoeDetails",
        },
      },
      {
        $unwind: "$shoeDetails",
      },
      {
        $project: {
          shoeId: "$shoeDetails._id",
          name: "$shoeDetails.name",
          subText: "$shoeDetails.subText",
          shortDescription: "$shoeDetails.shortDescription",
          code: "$shoeDetails.code",
          brand: "$shoeDetails.brand",
          images: {
            $arrayElemAt: ["$shoeDetails.images", 0],
          },
          price: "$shoeDetails.price",
          quantity: "$cart.items.quantity",
          size: "$cart.items.size",
          total: "$cart.total",
          subtotal: "$cart.subtotal",
          tax: "$cart.tax",
        },
      },
      {
        $group: {
          _id: null,
          items: { $push: "$$ROOT" },
          subtotal: { $first: "$subtotal" },
          tax: { $first: "$tax" },
          total: { $first: "$total" },
        },
      },
      {
        $project: {
          _id: 0,
          items: {
            shoeId: 1,
            name: 1,
            subText: 1,
            shortDescription: 1,
            code: 1,
            brand: 1,
            images: 1,
            quantity: 1,
            size: 1,
            price: 1,
          },
          subtotal: 1,
          tax: 1,
          total: 1,
        },
      },
    ]);

    return cartDetails;
  }

  async create(orderDetails) {
    const createdRecord = await Orders.create(orderDetails);
    return createdRecord._id;
  }

  async clearCart(userId) {
    const response = await Users.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      {
        $unset: {
          "cart.items": 1,
          "cart.subtotal": 1,
          "cart.tax": 1,
          "cart.total": 1,
        },
      }
    );

    return response;
  }
}

module.exports = BillingsDAL;
