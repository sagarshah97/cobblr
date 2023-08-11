const { serialize } = require("mongodb");
const Shoe = require("../shoes/shoes.model");

class FilterDAL {
  async getFilteredShoes(
    sortValue,
    selectedFilters,
    currentPage,
    searchKeyword,
    pageChangeType
  ) {
    const itemsPerPage = 8;
    if (
      pageChangeType === null ||
      pageChangeType === undefined ||
      pageChangeType === ""
    ) {
      currentPage = 1;
    }
    let priceFilter = {};
    if (selectedFilters.price) {
      if (selectedFilters.price === "100") {
        priceFilter = { price: { $lte: 100 } };
      } else if (selectedFilters.price === "100_200") {
        priceFilter = { price: { $gt: 100, $lte: 200 } };
      } else if (selectedFilters.price === "200") {
        priceFilter = { price: { $gt: 200 } };
      }
    }
    const filter = { $and: [] };

    if (selectedFilters.gender) {
      filter.$and.push({
        gender: { $regex: selectedFilters.gender, $options: "i" },
      });
    }

    if (selectedFilters.size) {
      filter.$and.push({
        "availableQuantity.size": {
          $regex: selectedFilters.size,
          $options: "i",
        },
      });
    }

    if (Object.keys(priceFilter).length > 0) {
      filter.$and.push(priceFilter);
    }

    let sort = {};
    if (sortValue === "sort2") {
      sort = { price: 1 };
    } else if (sortValue === "sort3") {
      sort = { price: -1 };
    } else {
      sort = { _id: 1 };
    }
    const textSearchFilter = {
      $or: [],
    };

    if (
      searchKeyword !== null &&
      searchKeyword !== undefined &&
      searchKeyword !== ""
    ) {
      textSearchFilter.$or.push(
        { name: { $regex: searchKeyword, $options: "i" } },
        { brand: { $regex: searchKeyword, $options: "i" } },
        { category: { $regex: searchKeyword, $options: "i" } },
        { type: { $regex: searchKeyword, $options: "i" } }
      );
    }

    const pipeline = [];

    if (textSearchFilter.$or.length > 0) {
      pipeline.push({ $match: textSearchFilter });
    }

    if (filter.$and.length > 0) {
      pipeline.push({ $match: { $and: filter.$and } });
    }

    pipeline.push(
      { $sort: sort },
      { $skip: (currentPage - 1) * itemsPerPage },
      { $limit: itemsPerPage },
      {
        $project: {
          name: 1,
          price: 1,
          images: {
            $cond: {
              if: { $isArray: "$images" },
              then: { $arrayElemAt: ["$images", 0] },
              else: "$images",
            },
          },
        },
      }
    );
    const visibleShoeData = await Shoe.aggregate(pipeline).exec();
    const totalItemsQuery = {};

    if (textSearchFilter.$or.length > 0 && filter.$and.length > 0) {
      totalItemsQuery.$and = [textSearchFilter, { $and: filter.$and }];
    } else if (textSearchFilter.$or.length > 0) {
      totalItemsQuery.$or = textSearchFilter.$or;
    } else if (filter.$and.length > 0) {
      totalItemsQuery.$and = filter.$and;
    }
    const totalItems = await Shoe.countDocuments(totalItemsQuery);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return { visibleShoeData, totalPages, currentPage };
  }
}

module.exports = FilterDAL;
