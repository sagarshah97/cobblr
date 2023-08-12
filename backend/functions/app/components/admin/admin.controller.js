const AdminService = require("./admin.service");

class AdminController {
  constructor() {
    this.adminService = new AdminService();
  }

  async getShoeList(request, response, next) {
    try {
      const shoeDetails = await this.adminService.getShoeList(
        request.body.value
      );
      if (shoeDetails) {
        response.status(200).json(shoeDetails);
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async addShoe(request, response, next) {
    try {
      const shoeCode = await this.adminService.addShoe(request.body);
      if (shoeCode === request.body.code) {
        response
          .status(200)
          .json({ message: "Successfully inserted record.", code: shoeCode });
      } else if (shoeCode.code === 11000) {
        response.status(400).json({ error: "Duplicate key error." });
      } else {
        response.status(400).json({ error: "Error saving data." });
      }
    } catch (error) {
      next(error);
    }
  }

  async modifyShoe(request, response, next) {
    try {
      const shoeCode = await this.adminService.modifyShoe(request.body);
      if (shoeCode === request.body.code) {
        response
          .status(200)
          .json({ message: "Successfully updated record.", code: shoeCode });
      } else {
        response.status(400).json({ error: "Error saving data." });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
