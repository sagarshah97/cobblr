const ShoesDAL = require("./shoes.dal");
const extractKeysFromObject = require("../../helpers/utils");
class ShoeService {
  constructor() {
    this.shoesDAL = new ShoesDAL();
  }

  async getShoe(_id) {
    try {
      const shoeDetails = await this.shoesDAL.getShoe(_id);
      return shoeDetails;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async getSimilarShoes(reqBody) {
    try {
      const shoeDetails = await this.shoesDAL.getSimilarShoes(reqBody);
      return shoeDetails;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async getShoes() {
    try {
      const shoes = await this.shoesDAL.getShoes();
      return shoes;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async createShoe(shoeDetails) {
    try {
      const shoeCode = await this.shoesDAL.createShoe(shoeDetails);
      return shoeCode;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  /*
   * Author: Ashish Ojha (B00931967)
   */

  async filterShoes(
    sortValue,
    selectedFilters,
    currentPage,
    searchKeyword,
    pageChangeType
  ) {
    try {
      let originalShoeData = await this.shoesDAL.getShoes();
      if (
        searchKeyword !== null ||
        searchKeyword !== undefined ||
        searchKeyword !== ""
      ) {
        originalShoeData = originalShoeData.filter((shoe) => {
          const { name, brand, category, type } = shoe;
          const searchTerm = searchKeyword.toLowerCase();
          return (
            name.toLowerCase().includes(searchTerm) ||
            brand.toLowerCase().includes(searchTerm) ||
            category.toLowerCase().includes(searchTerm) ||
            type.toLowerCase().includes(searchTerm)
          );
        });
      }
      let shoeData = originalShoeData;
      if (sortValue === "sort2") {
        shoeData.sort((a, b) => a.price - b.price);
      } else if (sortValue === "sort3") {
        shoeData.sort((a, b) => b.price - a.price);
      }
      if (selectedFilters != null || selectedFilters != undefined) {
        if (Object.keys(selectedFilters).length !== 0) {
          shoeData = originalShoeData.filter((shoe) => {
            const { gender = "", size = "", price = "" } = selectedFilters;
            const availableSizes = shoe.availableQuantity.map((quantity) =>
              quantity.size.toLowerCase()
            );
            if (
              (gender === "" || shoe.gender === gender) &&
              (size === "" || availableSizes.includes(size.toLowerCase())) &&
              (price === "" ||
                (price === "100" && shoe.price <= 100) ||
                (price === "100_200" &&
                  shoe.price > 100 &&
                  shoe.price <= 200) ||
                (price === "200" && shoe.price > 200))
            ) {
              return true;
            }
            return false;
          });
        }
      }
      let visibleShoeData = shoeData.map((shoe) => {
        const { images, ...rest } = shoe.toObject();
        const firstImage = images.length > 0 ? [images[0]] : [];
        return { ...rest, images: firstImage };
      });

      if (
        pageChangeType === null ||
        pageChangeType === undefined ||
        pageChangeType === ""
      ) {
        currentPage = 1;
      }
      const itemsPerPage = 12;
      const totalItems = visibleShoeData.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      visibleShoeData = visibleShoeData.slice(startIndex, endIndex);
      return { visibleShoeData, totalPages, currentPage };
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }
}

module.exports = ShoeService;
