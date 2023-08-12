// Author: Sahil Dilip Dalvi (B00939343)
const mongoose = require("mongoose");
const User = require("./users.model");
const bcrypt = require("bcrypt");

class UsersDal {
  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        return {
          userId: user._id,
          user: user,
          Role: user.isAdmin,
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

  async findUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (user) {
        return {
          user: user,
        };
      }
      return null;
    } catch (error) {
      console.error(error);
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

  async updateUser(email, updatedValues) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: updatedValues },
        { new: true }
      );

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUserPassword(email, newPassword) {
    try {
      const user = await User.findOne({ email });

      user.password = newPassword;
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }
  async updateProfileVisibility(email, profileVisibility) {
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        { profileVisibility },
        { new: true }
      );

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateAddress(email, updatedFields) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      const address = updatedFields.line1.concat(
        ", ",
        updatedFields.line2,
        ", ",
        updatedFields.city,
        ", ",
        updatedFields.state,
        ", ",
        updatedFields.postalCode
      );
      user.line1 = updatedFields.line1;
      user.line2 = updatedFields.line2;
      user.city = updatedFields.city;
      user.state = updatedFields.state;
      user.postalCode = updatedFields.postalCode;
      user.label = updatedFields.label;

      user.address.push(address);
      await user.save();

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateImage(file, email) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      user.profileImage = file;

      const updatedUser = await user.save();

      return updatedUser;
    } catch (error) {
      console.error("Error updating profile image:", error);
      throw error;
    }
  }

  async checkEmailExists(email, forgotPasswordToken) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        user.forgotPasswordToken = forgotPasswordToken;
        await user.save();
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updatePassword(token, newPassword) {
    try {
      const user = await User.findOne({ forgotPasswordToken: token });

      if (!user) {
        return false;
      }

      const isPasswordMatch = await bcrypt.compare(newPassword, user.password);

      if (isPasswordMatch) {
        throw new Error(
          "New password must be different from the current password"
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();

      return true;
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
