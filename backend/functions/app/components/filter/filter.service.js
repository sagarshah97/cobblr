//Author: Ashish Ojha (B00931967)
const extractKeysFromObject = require("../../helpers/utils");
const FilterDAL = require("./filter.dal");
class FilterService {
  constructor() {
    this.filterDal = new FilterDAL();
  }
  async filterShoes(
    sortValue,
    selectedFilters,
    currentPage,
    searchKeyword,
    pageChangeType
  ) {
    const filteredShoes = await this.filterDal.getFilteredShoes(
      sortValue,
      selectedFilters,
      currentPage,
      searchKeyword,
      pageChangeType
    );
    return filteredShoes;
  }
}

module.exports = FilterService;
