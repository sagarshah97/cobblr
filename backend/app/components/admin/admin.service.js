const AdminDAL = require("./admin.dal");

class AdminService {
  constructor() {
    this.adminDAL = new AdminDAL();
  }

  async getShoeList(shoeCode) {
    try {
      const shoeDetails = await this.adminDAL.getShoeList(shoeCode);
      // let filteredList = filterData(shoeDetails, [
      //   "_id",
      //   "code",
      //   "name",
      //   "brand",
      //   "sizes",
      //   "quantity",
      // ]);
      // return filteredList;
      return shoeDetails;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  // async getShoes() {
  //   try {
  //     const shoes = await this.shoesDAL.getShoes();
  //     return shoes;
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     //finally block
  //   }
  // }

  async addShoe(shoeDetails) {
    try {
      const shoeCode = await this.adminDAL.addShoe(shoeDetails);
      return shoeCode;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async modifyShoe(shoeDetails) {
    try {
      const shoeCode = await this.adminDAL.modifyShoe(shoeDetails);
      return shoeCode;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }
}

// const filterData = (array, attributeList) => {
//   let filteredList = [];
//   array.forEach((obj) => {
//     const filteredDetails = {};
//     attributeList.forEach((att) => {
//       filteredDetails[att] = obj[att];
//     });
//     filteredList.push(filteredDetails);
//   });
//   return filteredList;
// };

module.exports = AdminService;
