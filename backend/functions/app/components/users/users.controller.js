// Author: Sahil Dilip Dalvi (B00939343)
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
        const token = generateJwtWebToken(
          loginResult.userId,
          loginResult.Role ? "Admin" : "User"
        );
        response.status(200).json({
          message: "Login successful",
          userId: loginResult.userId,
          Role: loginResult.Role ? "Admin" : "User",
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

  changepassword = async (request, response, next) => {
    try {
      const changeResult = await this.usersService.changePasswordResult(
        request.body
      );
      if (changeResult.success) {
        response.status(200).json({ message: "Changed Succesfully" });
      } else {
        response
          .status(404)
          .json({ message: "Invalid Credentials. Try Again" });
      }
    } catch (error) {
      next(error);
    }
  };

  updateProfileVisibility = async (req, res, next) => {
    try {
      const { visibility, email } = req.body;
      const profileVisibility = visibility === "public" ? false : true;
      const updatedUser = await this.usersService.updateProfileVisibility(
        email,
        profileVisibility
      );

      res.status(200).json({
        message: "Profile visibility updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  };

  address = async (request, response, next) => {
    try {
      const addressResult = await this.usersService.saveAddress(request.body);
      if (addressResult) {
        response.status(200).json({ message: "Saved Succesfully" });
      } else {
        response.status(404).json({ message: "Error" });
      }
    } catch (error) {
      next(error);
    }
  };

  uploadImage = async (request, response, next) => {
    try {
      const uploadResult = await this.usersService.imageUploadService(
        request.body
      );
      if (uploadResult) {
        response.status(200).json({ message: "Saved Succesfully" });
      } else {
        response.status(404).json({ message: "Error" });
      }
    } catch (error) {
      next(error);
    }
  };

  forgotpassword = async (req, res) => {
    const { email } = req.body;

    try {
      await this.usersService.sendPasswordResetEmail(email);
      res.status(200).json({ message: "Password reset email sent." });
    } catch (error) {
      if (error.message === "Email not found") {
        res.status(404).json({ message: "User not found." });
      } else {
        console.error("Error sending password reset email:", error);
        res
          .status(500)
          .json({ message: "Failed to send password reset email." });
      }
    }
  };
  updatepassword = async (req, res) => {
    const { forgotPasswordToken, password } = req.body;

    try {
      const result = await this.usersService.passwordChanges(
        forgotPasswordToken,
        password
      );
      if (result) {
        res.status(200).json({ message: "Password changed successfully" });
      } else {
        res.status(400).json({ message: "Invalid token" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  };
}

module.exports = new UserController();
