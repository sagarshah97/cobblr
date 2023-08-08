const AdminDAL = require("./admin.dal");

class AdminService {
  constructor() {
    this.adminDAL = new AdminDAL();
  }

  async getShoeList(shoeCode) {
    try {
      const shoeDetails = await this.adminDAL.getShoeList(shoeCode);
      return shoeDetails;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

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

module.exports = AdminService;
