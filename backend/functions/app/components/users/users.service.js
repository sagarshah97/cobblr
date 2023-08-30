// Author: Sahil Dilip Dalvi (B00939343)
const UsersDal = require("./users.dal");
const bcrypt = require("bcrypt");
const { generateEmailVerificationToken } = require("../../helpers/jwt");
const sgMail = require("@sendgrid/mail");
const config = require("../../config/index");

class UsersService {
  constructor() {
    this.usersDal = new UsersDal();
  }

  async registerUser(userData) {
    try {
      const { firstName, lastName, email, password } = userData;

      const existingUser = await this.usersDal.getUserByEmail(email);
      if (existingUser) {
        return false;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      };

      const registrationResult = await this.usersDal.registerUser(newUser);

      return registrationResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async loginUser(loginData) {
    const { email, password } = loginData;

    const user = await this.usersDal.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.user.password);
    if (!passwordMatch) {
      return null;
    }

    return {
      userId: user.userId,
      Role: user.Role,
      success: true,
    };
  }

  async getUserProfile(userId) {
    try {
      const user = await this.usersDal.findUserById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUserProfile(userData) {
    try {
      const { firstName, lastName, email, phone } = userData;

      const updatedValues = {
        firstName,
        lastName,
        email,
        phone,
      };

      const profileResult = await this.usersDal.updateUser(
        email,
        updatedValues
      );

      return profileResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async displayUserText(userData) {
    try {
      const { email, inputText } = userData;
      const updatedValues = {
        inputText,
      };
      const displayResult = await this.usersDal.updateUser(
        email,
        updatedValues
      );

      return displayResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async changePasswordResult(userData) {
    try {
      const { email, currentPassword, newPassword } = userData;
      const updatedValues = {
        currentPassword,
        newPassword,
      };

      const user = await this.usersDal.getUserByEmail(email);

      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.user.password
      );

      if (!isPasswordMatch) {
        return { success: false, message: "Invalid current password" };
      }

      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await this.usersDal.updateUserPassword(
        email,
        newHashedPassword
      );

      return {
        success: true,
        message: "Password changed successfully",
        user: updatedUser,
      };
    } catch (error) {
      throw error;
    }
  }

  updateProfileVisibility = async (email, profileVisibility) => {
    try {
      const updatedUser = await this.usersDal.updateProfileVisibility(
        email,
        profileVisibility
      );

      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  async saveAddress(userData) {
    try {
      const { email, line1, line2, city, state, label, postalCode } = userData;

      const addressResult = await this.usersDal.updateAddress(email, {
        line1,
        line2,
        city,
        state,
        label,
        postalCode,
      });
      return addressResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async imageUploadService(userData) {
    try {
      const { file, email } = userData;
      const imageData = await this.usersDal.updateImage(file, email);
      return imageData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email) {
    const forgotPasswordToken = generateEmailVerificationToken(email);
    const emailExists = await this.usersDal.checkEmailExists(
      email,
      forgotPasswordToken
    );

    if (!emailExists) {
      throw new Error("Email not found");
    }

    sgMail.setApiKey(config.sendGridApiKey);
    const resetPasswordLink = `${config.frontendBaseUrl}/forgotpassword/${forgotPasswordToken}`;

    const msg = {
      to: email,
      from: config.cobblrEmail,
      subject: "Password Reset",
      text: `You have requested a password reset. Please click on the following link to reset your password: ${resetPasswordLink}`,
      html: `<p>You have requested a password reset. Please click on the following link to reset your password: <a href="${resetPasswordLink}">Reset Password</a></p>`,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw new Error("Failed to send password reset email");
    }
  }
  async passwordChanges(token, newPassword) {
    try {
      const result = await this.usersDal.updatePassword(token, newPassword);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await this.usersDal.getUserById(userId);
      return user;
    } catch (error) {
      throw error;
    } finally {
    }
  }

  async getWishlistCart(userId) {
    try {
      const userDetails = await this.usersDal.getWishlistCart(userId);
      return userDetails;
    } catch (error) {
      throw error;
    } finally {
    }
  }

  async getUserDetails(_id) {
    try {
      const response = await this.usersDal.getUserDetails(_id);
      return response;
    } catch (error) {
      throw error;
    } finally {
    }
  }
}

module.exports = UsersService;
