// Author: Sahil Dilip Dalvi (B00939343)
const Shoe = require("../shoes/shoes.model");
class HomeService {
  async getDistinctBrands() {
    try {
      const distinctBrands = await Shoe.distinct("brand");
      return distinctBrands;
    } catch (error) {
      console.error("Error fetching distinct brands:", error);
      throw error;
    }
  }
}

module.exports = HomeService;
