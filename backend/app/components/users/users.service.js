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

      // Check if the email already exists in the database
      // const user = await this.usersDal.getUserByEmail(email);
      // if (!user) {
      //   return null; // User not found
      // }
      // Create a new user instance
      const updatedValues = {
        firstName,
        lastName,
        email,
        phone,
      };

      // Save the user to the database
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

      // Compare the current password with the stored hashed password
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.user.password
      );

      if (!isPasswordMatch) {
        return { success: false, message: "Invalid current password" };
      }

      // Generate a new hashed password for the new password
      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database
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
      // const profileVisibility = visibility === "private";
      // Call the DAL function to update the profile visibility in the database
      const updatedUser = await this.usersDal.updateProfileVisibility(
        email,
        profileVisibility
      );

      // Additional logic or validations if needed

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
      // console.log(file);
      const imageData = await this.usersDal.updateImage(file, email);
      return imageData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = UsersService;
