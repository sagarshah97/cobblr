const mongoose = require("mongoose");
const User = require("./users.model");

class UsersDal {
  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        return {
          userId: user._id,
          user: user,
        };
      }
      return null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async registerUser(user) {
    try {
      return await User.create(user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getWishlistCart(userId) {
    try {
      const query = { _id: new mongoose.Types.ObjectId(userId) };
      const projection = { wishlist: 1, cart: 1 };
      return await User.findOne(query, projection);
    } catch (error) {
      return error;
    }
  }

  async getUserDetails(_id) {
    try {
      const desiredKeys = {
        name: 1,
        phone: 1,
        email: 1,
        address: 1,
      };
      return await User.findOne(
        { _id: new mongoose.Types.ObjectId(_id) },
        desiredKeys
      );
    } catch (error) {
      return error;
    }
  }
}

module.exports = UsersDal;
