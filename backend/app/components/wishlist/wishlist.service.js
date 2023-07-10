const WishlistDAL = require("./wishlist.dal");
const extractKeysFromObject = require("../../helpers/utils");
class WishlistService {
  constructor() {
    this.wishlistDAL = new WishlistDAL();
  }

  async getWishlist(userId) {
    try {
      const wishlistItems = await this.wishlistDAL.getWishlistItems(userId);
      return wishlistItems;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async addItemToWishlist(body) {
    try {
      const response = await this.wishlistDAL.addItemToWishlist(body);
      return response;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async removeWishlistItem(body) {
    try {
      const response = await this.wishlistDAL.removeWishlistItem(body);
      return response;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  // async getShoe(_id) {
  //   try {
  //     const shoeDetails = await this.shoesDAL.getShoe(_id);
  //     return shoeDetails;
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     //finally block
  //   }
  // }

  // async getSimilarShoes(reqBody) {
  //   try {
  //     const shoeDetails = await this.shoesDAL.getSimilarShoes(reqBody);

  //     let filteredList = [];
  //     let keys = ["_id", "code", "name", "subText", "price", "thumbnail"];
  //     shoeDetails.forEach((obj) => {
  //       const filteredDetails = extractKeysFromObject(obj, keys);
  //       filteredList.push(filteredDetails);
  //     });
  //     filteredList = filteredList.filter(
  //       (obj) => obj._id.toString() !== reqBody._id
  //     );

  //     return filteredList;
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     //finally block
  //   }
  // }

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

  // async createShoe(shoeDetails) {
  //   try {
  //     const shoeCode = await this.shoesDAL.createShoe(shoeDetails);
  //     return shoeCode;
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     //finally block
  //   }
  // }
}

module.exports = WishlistService;
