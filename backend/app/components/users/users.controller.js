const UsersService = require("./users.service");

class UserController {
  constructor() {
    this.usersService = new UsersService();
  }

  register = async (request, response, next) => {
    try {
      const registrationResult = await this.usersService.registerUser(
        request.body
      );
      if (registrationResult) {
        response.status(200).json({ message: "Registration successful" });
      } else {
        response.status(409).json({ message: "Email already exists" });
      }
    } catch (error) {
      next(error);
    }
  };
  login = async (request, response, next) => {
    try {
      const loginResult = await this.usersService.loginUser(request.body);
      if (loginResult) {
        response
          .status(200)
          .json({ message: "Login successful", userId: loginResult.userId });
      } else {
        response.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      next(error);
    }
  };
  getUserById = async (request, response, next) => {
    try {
      const { userId } = request.body;
      const user = await this.usersService.getUserById(userId);
      if (user) {
        response.status(200).json(user);
      } else {
        response.status(404).json({ error: "User not found." });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
