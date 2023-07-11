const Shoe = require("../shoes/shoes.model");
// const AdminShoe = require("./admin.model");

class AdminDAL {
  async getShoeList(shoeCode) {
    const pattern = new RegExp(shoeCode, "i");
    const query = [
      { code: { $regex: pattern } },
      { name: { $regex: pattern } },
      { brand: { $regex: pattern } },
    ];
    //};
    const shoes = Shoe.find({ $or: query }).select({
      code: 1,
      name: 1,
      brand: 1,
    });
    return shoes;
  }

  // async getShoes() {
  //   const shoes = Shoe.find({});
  //   return shoes;
  // }

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
