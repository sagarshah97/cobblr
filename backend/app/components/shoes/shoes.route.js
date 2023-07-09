const express = require("express");

const { authenticateJwt } = require("../../helpers/jwt");
const { validate } = require("../../lib/expressValidation");

const shoesController = require("./shoes.controller");
const shoesValidation = require("./shoes.validation");

const router = express.Router();

// get all the shoes
router.route("/getshoes").get(shoesController.getShoes.bind(shoesController));

// get single shoe record based on shoe code
router
  .route("/getshoe")
  .post(
    validate(shoesValidation.getShoe),
    shoesController.getShoe.bind(shoesController)
  );

// create a new shoe record
router
  .route("/createShoe")
  .post(
    validate(shoesValidation.createShoe),
    shoesController.createShoe.bind(shoesController)
  );

module.exports = router;
