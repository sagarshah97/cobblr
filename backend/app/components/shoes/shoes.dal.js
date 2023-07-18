const Shoe = require("./shoes.model");

class ShoesDAL {
  async getShoe(_id) {
    const shoes = Shoe.findById(_id);
    return shoes;
  }

  async getShoes() {
    const shoes = Shoe.find({});
    return shoes;
  }

  async getSimilarShoes(reqBody) {
    const { tags } = reqBody;
    const shoes = await Shoe.find({ tags: { $all: tags } });
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
