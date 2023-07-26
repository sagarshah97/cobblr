const UsersDal = require("./users.dal");
const bcrypt = require("bcrypt");

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

      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user instance
      const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
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

    const passwordMatch = await bcrypt.compare(password, user.user.password);
    // Compare the provided password with the stored password
    if (!passwordMatch) {
      return null; // Invalid password
    }

    // If both email and password are valid, return the user
    return {
      userId: user.userId, // Assuming the user ID is stored in the "_id" field
      success: true,
    };
  }
  async getUserById(userId) {
    try {
      const user = await this.usersDal.getUserById(userId);
      return user;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async getWishlistCart(userId) {
    try {
      const userDetails = await this.usersDal.getWishlistCart(userId);
      return userDetails;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async getUserDetails(_id) {
    try {
      const response = await this.usersDal.getUserDetails(_id);
      return response;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }
}

module.exports = UsersService;
