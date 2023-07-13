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
}

module.exports = UsersDal;
