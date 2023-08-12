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

router.route("/addShoe").post(adminController.addShoe.bind(adminController));

router
  .route("/modifyShoe")
  .put(adminController.modifyShoe.bind(adminController));

module.exports = router;
