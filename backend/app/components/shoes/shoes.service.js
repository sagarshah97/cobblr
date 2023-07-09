const ShoesDAL = require("./shoes.dal");

class UserService {
  constructor() {
    this.shoesDAL = new ShoesDAL();
  }

  async getShoe(shoeCode) {
    try {
      const shoeDetails = await this.shoesDAL.getShoe(shoeCode);
      return shoeDetails;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async getShoes() {
    try {
      const shoes = await this.shoesDAL.getShoes();
      return shoes;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async createShoe(shoeDetails) {
    try {
      const shoeCode = await this.shoesDAL.createShoe(shoeDetails);
      return shoeCode;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }
}

module.exports = UserService;
