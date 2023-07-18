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

  getWishlistCart = async (request, response, next) => {
    try {
      const userDetails = await this.usersService.getWishlistCart(
        request.body._id
      );
      if (userDetails) {
        response.status(200).json({ userDetails });
      } else {
        response.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      next(error);
    }
  };

  addToWishlist = async (request, response, next) => {
    try {
      const userDetails = await this.usersService.addToWishlist(request.body);
      if (userDetails) {
        response.status(200).json({ message: "Added to wishlist." });
      } else {
        response.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      next(error);
    }
  };

  addToCart = async (request, response, next) => {
    try {
      const userDetails = await this.usersService.addToCart(request.body);
      if (userDetails) {
        response.status(200).json({ message: "Added to cart." });
      } else {
        response.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      next(error);
    }
  };

  getUserDetails = async (request, response, next) => {
    try {
      const userDetails = await this.usersService.getUserDetails(
        request.body._id
      );
      if (userDetails) {
        response.status(200).json({ userDetails });
      } else {
        response.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
