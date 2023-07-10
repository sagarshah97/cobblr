const User = require("./users.model");

class UsersDal {
  async getUserByEmail(email) {
    try {
      return await User.findOne({ email });
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
}

module.exports = UsersDal;
