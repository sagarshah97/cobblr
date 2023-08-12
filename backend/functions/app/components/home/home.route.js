// Author: Sahil Dilip Dalvi (B00939343)
const express = require("express");
const router = express.Router();
const HomeController = require("./home.controller");
const { validate } = require("../../lib/expressValidation");
const { authenticateJwt, verifyToken } = require("../../helpers/jwt");

router.route("/brands").get(HomeController.fetchDistinctBrands);

module.exports = router;
