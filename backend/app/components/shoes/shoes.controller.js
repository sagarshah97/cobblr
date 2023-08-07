// Author: Sagar Paresh Shah (B00930009)

const ShoesService = require("./shoes.service");

class ShoeController {
  constructor() {
    this.shoesService = new ShoesService();
  }

  async getShoe(request, response, next) {
    try {
      const shoeDetails = await this.shoesService.getShoe(request.body._id);
      if (shoeDetails) {
        response.status(200).json(shoeDetails);
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async getSimilarShoes(request, response, next) {
    try {
      const shoeDetails = await this.shoesService.getSimilarShoes(request.body);
      if (shoeDetails) {
        response.status(200).json(shoeDetails);
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async getShoes(request, response, next) {
    try {
      const shoeDetails = await this.shoesService.getShoes();
      if (shoeDetails) {
        response.status(200).json(shoeDetails);
      } else {
        response.status(404).json({ error: "No records found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async createShoe(request, response, next) {
    try {
      const shoeCode = await this.shoesService.createShoe(request.body);
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
}

module.exports = new ShoeController();
