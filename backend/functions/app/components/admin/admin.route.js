const express = require("express");

const { authenticateJwt } = require("../../helpers/jwt");
const { validate } = require("../../lib/expressValidation");

const adminController = require("./admin.controller");
const adminValidation = require("./admin.validation");

const router = express.Router();

router
  .route("/getshoelist")
  .post(
    validate(adminValidation.searchShoes),
    adminController.getShoeList.bind(adminController)
  );

// add a new shoe record
router.route("/addShoe").post(
  // validate(adminValidation.addShoe),
  adminController.addShoe.bind(adminController)
);

router.route("/modifyShoe").put(
  // validate(adminValidation.addShoe),
  adminController.modifyShoe.bind(adminController)
);

module.exports = router;
