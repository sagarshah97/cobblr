// Author: Sagar Paresh Shah (B00930009)

const ShoesDAL = require("./shoes.dal");
class ShoeService {
  constructor() {
    this.shoesDAL = new ShoesDAL();
  }

  async getShoe(_id) {
    try {
      const shoeDetails = await this.shoesDAL.getShoe(_id);
      return shoeDetails;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async getSimilarShoes(reqBody) {
    try {
      const shoeDetails = await this.shoesDAL.getSimilarShoes(reqBody);
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

module.exports = ShoeService;
