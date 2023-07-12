const UsersService = require("./users.service");
const { generateJwtWebToken } = require("../../helpers/jwt");

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
        const token = generateJwtWebToken(loginResult.userId);
        response.status(200).json({
          message: "Login successful",
          userId: loginResult.userId,
          token,
        });
      } else {
        response.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      next(error);
    }
  };

  profile = async (request, response, next) => {
    try {
      const userId = request.params.userId;
      const user = await this.usersService.getUserProfile(userId);

      if (!user) {
        response.status(404).json({ error: "User not found" });
      } else {
        response.status(200).json(user);
      }
    } catch (error) {
      next(error);
    }
  };

  profileupdate = async (request, response, next) => {
    try {
      const profileResult = await this.usersService.updateUserProfile(
        request.body
      );
      if (profileResult) {
        response
          .status(200)
          .json({ message: "Edited Detils changed succesfully" });
      } else {
        response.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  displaytext = async (request, response, next) => {
    try {
      const displayResult = await this.usersService.displayUserText(
        request.body
      );
      if (displayResult) {
        response.status(200).json({ message: "Saved Succesfully" });
      } else {
        response.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
