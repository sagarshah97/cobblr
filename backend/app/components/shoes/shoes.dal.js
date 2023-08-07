// Author: Sagar Paresh Shah (B00930009)

const mongoose = require("mongoose");
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
    const desiredKeys = {
      name: 1,
      brand: 1,
      code: 1,
      subText: 1,
      price: 1,
      images: { $slice: 1 },
    };
    const { tags, _ids } = reqBody;

    let query = {};

    if (_ids && _ids.length === 1 && _ids[0] === "null") {
      query = { tags: { $in: tags } };
    } else {
      const currentShoesObjectIds = _ids.map(
        (shoeId) => new mongoose.Types.ObjectId(shoeId)
      );
      query = { tags: { $in: tags }, _id: { $nin: currentShoesObjectIds } };
    }

    const shoes = await Shoe.find(query, desiredKeys).limit(3);
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
