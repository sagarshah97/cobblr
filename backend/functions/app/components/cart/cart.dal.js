// Author: Pratik Mukund Parmar (B00934515)

const mongoose = require("mongoose");
const User = require("../users/users.model");
const Shoe = require("../shoes/shoes.model");

class CartDal {
  async getCart(userId) {
    try {
      const cartItems = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(userId) } },
        { $unwind: "$cart.items" },
        {
          $lookup: {
            from: "shoes",
            localField: "cart.items.shoeId",
            foreignField: "_id",
            as: "cart.items.shoeId",
          },
        },
        { $unwind: "$cart.items.shoeId" },
        {
          $project: {
            _id: "$cart.items.shoeId._id",
            name: "$cart.items.shoeId.name",
            code: "$cart.items.shoeId.code",
            brand: "$cart.items.shoeId.brand",
            tags: "$cart.items.shoeId.tags",
            images: { $arrayElemAt: ["$cart.items.shoeId.images", 0] },
            price: "$cart.items.shoeId.price",
            quantity: "$cart.items.quantity",
            size: "$cart.items.size",
          },
        },
      ]);
      return cartItems;
    } catch (error) {
      throw error;
    }
  }

  async updateCartTotals(userId, subtotal, tax, total) {
    try {
      const user = await User.findById(userId);
      user.cart.subtotal = subtotal;
      user.cart.tax = tax;
      user.cart.total = total;
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  async addToCart(reqBody) {
    try {
      const { userId, cartItem } = reqBody;

      const filter = { _id: new mongoose.Types.ObjectId(userId) };
      const update = { $push: { "cart.items": cartItem } };

      return await User.findOneAndUpdate(filter, update, { new: true });
    } catch (error) {
      return error;
    }
  }
  async updateCartItemQuantity(userId, cartItemId, quantity, size) {
    try {
      const user = await User.findById(userId);
      const cartItem = user.cart.items.find(
        (item) => item.shoeId.toString() === cartItemId && item.size === size
      );

      if (cartItem) {
        const shoeId = cartItem.shoeId;
        const shoe = await Shoe.findById(shoeId);

        cartItem.quantity = quantity;
        user.cart.subtotal = await this.calculateSubtotal(user.cart.items);
        user.cart.tax = user.cart.subtotal * 0.15;
        user.cart.total = user.cart.subtotal + user.cart.tax;

        await user.save();
      }

      return user.cart;
    } catch (error) {
      throw error;
    }
  }

  async removeCartItem(userId, cartItemId, quantity, size) {
    try {
      const user = await User.findById(userId);

      const itemIndex = user.cart.items.findIndex(
        (item) =>
          item.shoeId.toString() === cartItemId &&
          item.size === size &&
          item.quantity === quantity
      );

      if (itemIndex !== -1) {
        user.cart.items.splice(itemIndex, 1);

        user.cart.subtotal = await this.calculateSubtotal(user.cart.items);
        user.cart.tax = user.cart.subtotal * 0.15;
        user.cart.total = user.cart.subtotal + user.cart.tax;

        await user.save();
      } else {
        throw new Error("Cart item not found");
      }

      return user.cart;
    } catch (error) {
      throw error;
    }
  }

  async calculateSubtotal(cartItems) {
    try {
      const shoeIds = cartItems.map((item) => item.shoeId);
      const shoes = await Shoe.find({ _id: { $in: shoeIds } });

      let subtotal = 0;

      await Promise.all(
        cartItems.map(async (item) => {
          const shoe = shoes.find(
            (shoe) => shoe._id.toString() === item.shoeId.toString()
          );
          if (shoe) {
            subtotal += item.quantity * shoe.price;
          }
        })
      );

      return subtotal;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartDal;
