// Author: Aayush Yogesh Pandya (B00939670)

const WishlistService = require("./wishlist.service");

class WishlistController {
  constructor() {
    this.wishlistService = new WishlistService();
  }

  async getWishlist(request, response, next) {
    try {
      const wishlist = await this.wishlistService.getWishlist(request.body._id);
      if (wishlist) {
        response.status(200).json(wishlist);
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async addItemToWishlist(request, response, next) {
    try {
      const res = await this.wishlistService.addItemToWishlist(request.body);
      response.status(200).json(res);
    } catch (error) {
      next(error);
    }
  }

  async removeWishlistItem(request, response, next) {
    try {
      const res = await this.wishlistService.removeWishlistItem(request.body);
      if (res) {
        res.message = "Product removed from wishlist!";
        response.status(200).json(res);
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WishlistController();
