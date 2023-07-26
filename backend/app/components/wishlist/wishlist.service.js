const WishlistDAL = require("./wishlist.dal");
class WishlistService {
  constructor() {
    this.wishlistDAL = new WishlistDAL();
  }

  async getWishlist(userId) {
    try {
      const wishlistItems = await this.wishlistDAL.getWishlistItems(userId);
      //console.log(wishlistItems);
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
      // console.log(">>>>");
      // console.log(response);

      const wishlistItems = await this.wishlistDAL.getWishlistItems(
        response?._id
      );
      // const tempWishlist = response.wishlistedItems?.map((item) => {
      //   const firstImage = item.images[0];
      //   const firstTag = item.tags[0];

      //   return {
      //     _id: item._id,
      //     name: item.name,
      //     code: item.code,
      //     brand: item.brand,
      //     tags: firstTag,
      //     images: firstImage,
      //     price: item.price,
      //   };
      // });

      // let resObj = response.toObject();
      // resObj.wishlistedItems = tempWishlist;

      // console.log(resObj);
      return wishlistItems;
      // return resObj;
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