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
      console.log(updatedValues);
      const updatedUser = await User.findOneAndUpdate(
        { email }, // Filter the user by email
        { $set: updatedValues }, // Update the user's profile fields
        { new: true } // Return the updated user document
      );

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUserPassword(email, newPassword) {
    try {
      // Retrieve the user from the database
      const user = await User.findOne({ email });

      // Update the user's password
      user.password = newPassword;
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }
  async updateProfileVisibility(email, profileVisibility) {
    try {
      // Find the user by email
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
      // Retrieve the user from the database based on the email
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      // Update the user object with the provided address fields
      user.line1 = updatedFields.line1;
      user.line2 = updatedFields.line2;
      user.city = updatedFields.city;
      user.state = updatedFields.state;
      user.postalCode = updatedFields.postalCode;
      user.label = updatedFields.label;

      // Save the updated user to the database
      await user.save();

      // Return the updated user object or any other desired result
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateImage(file, email) {
    try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      // Update the user's profileImage field
      user.profileImage = file;

      // Save the updated user
      const updatedUser = await user.save();

      // Return the updated user data or any other relevant response
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
        return true; // Email exists in the database
      }
      return false; // Email does not exist in the database
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // async updatePassword(token, newPassword) {
  //   try {
  //     const user = await User.findOne({ forgotPasswordToken: token });

  //     if (!user) {
  //       return false; // Invalid token
  //     }

  //     user.password = newPassword;
  //     await user.save();

  //     return true;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async updatePassword(token, newPassword) {
    try {
      const user = await User.findOne({ forgotPasswordToken: token });

      if (!user) {
        return false; // Invalid token
      }

      // Compare current password with the one provided
      const isPasswordMatch = await bcrypt.compare(newPassword, user.password);

      if (isPasswordMatch) {
        throw new Error(
          "New password must be different from the current password"
        );
      }

      // Encrypt the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
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
