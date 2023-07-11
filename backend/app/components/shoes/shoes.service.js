const ShoesDAL = require("./shoes.dal");
const extractKeysFromObject = require("../../helpers/utils");
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

      let filteredList = [];
      let keys = ["_id", "code", "name", "subText", "price"];
      shoeDetails.forEach((obj) => {
        let filteredDetails = extractKeysFromObject(obj, keys);
        filteredDetails = {
          ...filteredDetails,
          thumbnail: obj.images[0],
        };
        filteredList.push(filteredDetails);
      });
      filteredList = filteredList.filter(
        (obj) => obj._id.toString() !== reqBody._id
      );

      return filteredList;
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
