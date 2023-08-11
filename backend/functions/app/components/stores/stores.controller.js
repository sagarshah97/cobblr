//Author : jayant Patidar

const StoreService = require("./stores.service");

class StoreController {
  constructor() {
    this.storeService = new StoreService();
  }

  async getAllStores(request, response, next) {
    try {
      const allStores = await this.storeService.getAllStores();
      if (allStores) {
        response.status(200).json(allStores);
      } else {
        response.status(404).json({ error: "No records found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async getStoreByStoreId(request, response, next) {
    try {
      const store = await this.storeService.getStoreByStoreId(request.body._id);
      if (store) {
        response.status(200).json(store);
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async addStore(request, response, next) {
    try {
      const newStore = await this.storeService.addStore(request.body);
      response.status(201).json(newStore);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new StoreController();
