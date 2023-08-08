// Author: Sahil Dilip Dalvi (B00939343)
const HomeService = require("./home.service");
const { generateJwtWebToken } = require("../../helpers/jwt");

class HomeController {
  constructor() {
    this.homeService = new HomeService();
    this.fetchDistinctBrands = this.fetchDistinctBrands.bind(this);
  }
  async fetchDistinctBrands(req, res, next) {
    try {
      const distinctBrands = await this.homeService.getDistinctBrands();
      res.status(200).json(distinctBrands);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new HomeController();
