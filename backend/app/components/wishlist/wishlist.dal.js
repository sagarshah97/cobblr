const User = require("./users.model");
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
            localField: "wishlistedItems",
            foreignField: "_id",
            as: "wishlistItems",
          },
        },
        { $unwind: "$wishlistItems" },
        {
          $project: {
            _id: "$wishlistItems._id",
            name: "$wishlistItems.name",
            code: "$wishlistItems.code",
            brand: "$wishlistItems.brand",
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
      console.log(body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(userId) },
        { $addToSet: { wishlistedItems: new mongoose.Types.ObjectId(itemId) } },
        { new: true }
      );
      console.log(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeWishlistItem(body) {
    try {
      const userId = body.userId;
      const itemId = body.itemId;
      console.log("userId:", userId);
      console.log("itemId:", itemId);
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { wishlistedItems: itemId } },
        { new: true }
      )
        .populate("wishlistedItems", "name code brand")
        .select({ wishlistedItems: 1, _id: 0 });

      console.log(updatedUser);
      return updatedUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // async getShoes() {
  //   const shoes = Shoe.find({});
  //   return shoes;
  // }

  // async getSimilarShoes(reqBody) {
  //   const { tags } = reqBody;
  //   const shoes = await Shoe.find({ tags: { $all: tags } });
  //   return shoes;
  // }

  // async createShoe(shoeDetails) {
  //   const shoe = new Shoe(shoeDetails);

  //   if (!shoe) {
  //     return err;
  //   }

  //   try {
  //     const response = await shoe.save();
  //     return response.code;
  //   } catch (error) {
  //     return error;
  //   }
  // }
}

module.exports = WishlistDAL;
