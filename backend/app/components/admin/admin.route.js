const express = require("express");

const { authenticateJwt } = require("../../helpers/jwt");
const { validate } = require("../../lib/expressValidation");

const adminController = require("./admin.controller");
const adminValidation = require("./admin.validation");

const router = express.Router();

// get all the shoes
// router.route("/getshoes").get(shoesController.getShoes.bind(shoesController));

router
  .route("/getshoelist")
  .post(
    validate(adminValidation.searchShoes),
    adminController.getShoeList.bind(adminController)
  );

// get single shoe record based on shoe code
// router
//   .route("/getshoe")
//   .post(
//     validate(shoesValidation.getShoe),
//     shoesController.getShoe.bind(shoesController)
//   );

// add a new shoe record
router
  .route("/addShoe")
  .post(
    validate(adminValidation.addShoe),
    adminController.addShoe.bind(adminController)
  );

module.exports = router;
