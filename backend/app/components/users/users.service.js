const UsersDal = require("./users.dal");

class UsersService {
  constructor() {
    this.usersDal = new UsersDal();
  }

  async registerUser(userData) {
    try {
      const { firstName, lastName, email, password } = userData;

      // Check if the email already exists in the database
      const existingUser = await this.usersDal.getUserByEmail(email);
      if (existingUser) {
        return false;
      }

      // Create a new user instance
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };

      // Save the user to the database
      const registrationResult = await this.usersDal.registerUser(newUser);

      return registrationResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = UsersService;
