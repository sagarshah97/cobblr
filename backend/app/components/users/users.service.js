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

  async loginUser(loginData) {
    const { email, password } = loginData;

    // Retrieve the user from the database based on the email
    const user = await this.usersDal.getUserByEmail(email);

    if (!user) {
      return null; // User not found
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
      return null; // Invalid password
    }

    // If both email and password are valid, return the user
    return user;
  }
}

module.exports = UsersService;
