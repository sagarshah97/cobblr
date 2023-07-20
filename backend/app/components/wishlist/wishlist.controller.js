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

      // if (res!=null) {
      //   let resObj = {};
      //   resObj.messag = "Product added to wishlist!";
      response.status(200).json(res);
      // } else {
      //   response.status(404).json({ error: "No record found." });
      // }
    } catch (error) {
      next(error);
    }
  }

  async removeWishlistItem(request, response, next) {
    try {
      const res = await this.wishlistService.removeWishlistItem(request.body);
      if (res) {
        // let resObj = res.toObject();
        // let resObj = res;
        res.message = "Product removed from wishlist!";
        // console.log(resObj);
        response.status(200).json(res);
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }

  // async getSimilarShoes(request, response, next) {
  //   try {
  //     const shoeDetails = await this.shoesService.getSimilarShoes(request.body);
  //     if (shoeDetails) {
  //       response.status(200).json(shoeDetails);
  //     } else {
  //       response.status(404).json({ error: "No record found." });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async getShoes(request, response, next) {
  //   try {
  //     const shoeDetails = await this.shoesService.getShoes();
  //     if (shoeDetails) {
  //       response.status(200).json(shoeDetails);
  //     } else {
  //       response.status(404).json({ error: "No records found." });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async createShoe(request, response, next) {
  //   try {
  //     const shoeCode = await this.shoesService.createShoe(request.body);
  //     if (shoeCode === request.body.code) {
  //       response
  //         .status(200)
  //         .json({ message: "Successfully inserted record.", code: shoeCode });
  //     } else if (shoeCode.code === 11000) {
  //       response.status(400).json({ error: "Duplicate key error." });
  //     } else {
  //       response.status(400).json({ error: "Error saving data." });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = new WishlistController();
