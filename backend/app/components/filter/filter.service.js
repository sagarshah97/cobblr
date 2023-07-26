/*
 * Author: Ashish Ojha (B00931967)
 */
const ShoesDAL = require("../shoes/shoes.dal");
const extractKeysFromObject = require("../../helpers/utils");
class FilterService {
  constructor() {
    this.shoesDAL = new ShoesDAL();
  }
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
        searchKeyword !== null &&
        searchKeyword !== undefined &&
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
              (gender === "" ||
                shoe.gender.toLowerCase() === gender.toLowerCase()) &&
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
      console.log("Reached here", visibleShoeData);
      const itemsPerPage = 8;
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

module.exports = FilterService;
