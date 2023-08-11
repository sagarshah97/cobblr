//Author : jayant Patidar

const StoreDAL = require("./stores.dal");

class StoreService {
  constructor() {
    this.storesDAL = new StoreDAL();
  }

  async getStoreByStoreId(_storeId) {
    try {
      const store = await this.storesDAL.getStoreByStoreId(_storeId);
      return store;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async getAllStores() {
    try {
      const allStores = await this.storesDAL.getAllStores();
      return allStores;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async addStore(storeData) {
    try {
      const newStore = await this.storesDAL.addStore(storeData);
      return newStore;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }
}

module.exports = StoreService;
