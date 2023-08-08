//Author: Ashish Ojha (B00931967)
const FilterService = require("./filter.service");

class FilterController {
  constructor() {
    this.filterService = new FilterService();
  }

  async filterShoes(request, response, next) {
    try {
      const {
        sortValue,
        selectedFilters,
        currentPage,
        searchKeyword,
        pageChangeType,
      } = request.body;
      if (!sortValue) {
        return response
          .status(400)
          .json({ error: "Missing required parameters." });
      }
      const filteredShoes = await this.filterService.filterShoes(
        sortValue,
        selectedFilters,
        currentPage,
        searchKeyword,
        pageChangeType
      );
      if (filteredShoes.length === 0) {
        return response
          .status(404)
          .json({ error: "No matching records found." });
      }
      response.status(200).json(filteredShoes);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FilterController();
