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
        response.status(200).json({ message: "Login successful" });
      } else {
        response.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
