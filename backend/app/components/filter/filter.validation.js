//Author: Ashish Ojha (B00931967)
const Joi = require("joi");

const validationSchema = {
  sortValue: Joi.string()
    .valid("sort1", "sort2", "sort3")
    .default("sort1")
    .required(),
  selectedFilters: Joi.object().pattern(/^.*$/, Joi.string()),
  currentPage: Joi.number().default(1).optional(),
  searchKeyword: Joi.string().allow("", null).optional(),
  pageChangeType: Joi.string().allow("", null).optional(),
};

module.exports = {
  filterShoes: {
    body: Joi.object({
      sortValue: validationSchema.sortValue,
      selectedFilters: validationSchema.selectedFilters,
      currentPage: validationSchema.currentPage,
      searchKeyword: validationSchema.searchKeyword,
      pageChangeType: validationSchema.pageChangeType,
    }),
  },
};
