//Author : jayant Patidar

const express = require("express");

const { authenticateJwt } = require("../../helpers/jwt");

const storesController = require("./stores.controller");

const router = express.Router();

// get all stores
router
  .route("/getAllStores")
  .get(storesController.getAllStores.bind(storesController));

// get single store record based on store id
router
  .route("/getStoresByStoreId")
  .post(storesController.getStoreByStoreId.bind(storesController));

// create new store
router
  .route("/addStore")
  .post(storesController.addStore.bind(storesController));

module.exports = router;
