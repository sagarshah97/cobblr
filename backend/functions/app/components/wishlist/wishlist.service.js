// Author: Aayush Yogesh Pandya (B00939670)

const WishlistDAL = require("./wishlist.dal");
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
      const wishlistItems = await this.wishlistDAL.getWishlistItems(
        response?._id
      );
      return wishlistItems;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }
}

module.exports = WishlistService;
