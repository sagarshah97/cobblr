//Author: Ashish Ojha (B00931967)
const express = require("express");
const { validate } = require("../../lib/expressValidation");
const { verifyToken } = require("../../helpers/jwt");
const filterController = require("./filter.controller");
const filterValidation = require("./filter.validation");

const router = express.Router();

// sort and filter api
router
  .route("/filterShoes")
  .post(
    verifyToken,
    validate(filterValidation.filterShoes),
    filterController.filterShoes.bind(filterController)
  );

module.exports = router;
