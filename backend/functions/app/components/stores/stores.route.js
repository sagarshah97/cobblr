//Author : Jayant Patidar (B00934519)
const express = require("express");

const { authenticateJwt } = require("../../helpers/jwt");
// const { validate } = require("../../lib/expressValidation");

const storesController = require("./stores.controller");
// const storesValidation = require("./stores.validation");

const router = express.Router();

// get all stores
router
  .route("/getAllStores")
  .get(storesController.getAllStores.bind(storesController));

// get single store record based on store id
router.route("/getStoresByStoreId").post(
  // validate(storesValidation.getStoreByStoreId),
  storesController.getStoreByStoreId.bind(storesController)
);

// create new store
router.route("/addStore").post(
  // validate(storesValidation.addStore),
  storesController.addStore.bind(storesController)
);

module.exports = router;
