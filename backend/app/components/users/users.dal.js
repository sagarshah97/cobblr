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
}

module.exports = UsersDal;
