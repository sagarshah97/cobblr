const Shoe = require("../shoes/shoes.model");
// const AdminShoe = require("./admin.model");
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
      //};
      shoes = Shoe.find({ $or: query }).select({
        code: 1,
        name: 1,
        brand: 1,
      });
    }
    return shoes;
  }

  // async getShoes() {
  //   const shoes = Shoe.find({});
  //   return shoes;
  // }

  async modifyShoe(shoeDetails) {
    // const shoe = new Shoe(shoeDetails);
    // const result = await Shoe.findOneAndUpdate(
    //   { _id: shoeDetails._id }, // Filter based on the _id field
    //   { $set: shoeDetails }, // Update the document with the provided fields
    //   { returnOriginal: false } // Return the updated document after the update
    // );
    // if (!result) {
    //   return err;
    // }

    try {
      // const objectId =  new ObjectId(shoeDetails._id);

      // Perform the update operation
      const result = await Shoe.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(shoeDetails._id) }, // Filter based on the _id field
        { $set: shoeDetails }, // Update the document with the provided fields
        { returnOriginal: false } // Return the updated document after the update
      );
      // const response = await shoe.save();
      console.log(result);
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
