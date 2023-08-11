//Author : jayant Patidar

const Store = require("./stores.model");

class StoreDAL {
  async getAllStores() {
    const allStores = Store.find({});
    return allStores;
  }
  async getStoreByStoreId(storeId) {
    try {
      const store = await Store.findById(storeId);
      return store;
    } catch (error) {
      throw error;
    }
  }
  async addStore(storeData) {
    try {
      const newStore = await Store.create(storeData);
      return newStore;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = StoreDAL;
