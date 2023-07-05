const Shoe = require("./shoes.model");

class ShoesDAL {
  async getShoe(shoeCode) {
    const shoes = Shoe.findOne({ code: shoeCode });
    return shoes;
  }

  async getShoes() {
    const shoes = Shoe.find({});
    return shoes;
  }

  async createShoe(shoeDetails) {
    const shoe = new Shoe(shoeDetails);

    if (!shoe) {
      return err;
    }

    try {
      const response = await shoe.save();
      return response.code;
    } catch (error) {
      return error;
    }
  }
}

module.exports = ShoesDAL;
