const Shoe = require("../shoes/shoes.model");
const mongoose = require("mongoose");

class AdminDAL {
  async getShoeList(shoeCode) {
    let shoes = [];
    if (!shoeCode) {
      shoes = Shoe.find().limit(10).select({ code: 1, name: 1, brand: 1 });
    } else {
      const pattern = new RegExp(shoeCode, "i");
      const query = [
        { code: { $regex: pattern } },
        { name: { $regex: pattern } },
        { brand: { $regex: pattern } },
      ];
      shoes = Shoe.find({ $or: query }).select({
        code: 1,
        name: 1,
        brand: 1,
      });
    }
    return shoes;
  }

  async modifyShoe(shoeDetails) {
    try {
      const result = await Shoe.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(shoeDetails._id) },
        { $set: shoeDetails },
        { returnOriginal: false }
      );
      return result.code;
    } catch (error) {
      return error;
    }
  }

  async addShoe(shoeDetails) {
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

module.exports = AdminDAL;
