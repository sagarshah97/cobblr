// Author: Aayush Yogesh Pandya (B00939670)

const User = require("../users/users.model");
const Shoe = require("../shoes/shoes.model");
const mongoose = require("mongoose");

class WishlistDAL {
  async getWishlistItems(userId) {
    try {
      const wishlistItems = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(userId) } },
        {
          $lookup: {
            from: "shoes",
            localField: "wishlist",
            foreignField: "_id",
            as: "wishlist",
          },
        },
        { $unwind: "$wishlist" },
        {
          $project: {
            _id: "$wishlist._id",
            name: "$wishlist.name",
            code: "$wishlist.code",
            brand: "$wishlist.brand",
            tags: "$wishlist.tags",
            images: { $arrayElemAt: ["$wishlist.images", 0] },
            price: "$wishlist.price",
          },
        },
      ]);

      return wishlistItems;
    } catch (error) {
      console.error(error);
      //throw error;
      return null;
    }
  }

  async addItemToWishlist(body) {
    try {
      const userId = body.userId;
      const itemId = body.itemId;

      return await User.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(userId) },
        { $addToSet: { wishlist: new mongoose.Types.ObjectId(itemId) } },
        { new: true }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeWishlistItem(body) {
    try {
      const userId = body.userId;
      const itemId = body.itemId;
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { wishlist: itemId } },
        { new: true }
      ).select({ _id: 0 });

      return updatedUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = WishlistDAL;
