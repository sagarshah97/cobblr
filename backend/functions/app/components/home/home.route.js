const express = require("express");
const router = express.Router();
const HomeController = require("./home.controller");
// const userValidation = require("./users.validation");
const { validate } = require("../../lib/expressValidation");
const { authenticateJwt, verifyToken } = require("../../helpers/jwt");

// router.route("/displaytext").post(HomeController.displaytext);

router.route("/brands").get(HomeController.fetchDistinctBrands);

module.exports = router;
