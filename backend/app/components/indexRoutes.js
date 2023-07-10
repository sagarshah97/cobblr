const express = require("express");
const router = express.Router();
const shoesRoutes = require("./shoes/shoes.route");
const adminRoutes = require("./admin/admin.route");
const wishlistRoutes = require("./wishlist/wishlist.route");

const healthCheck = (request, response) => {
  response.status(200).send({
    status: true,
  });
};

router.use("/shoes", shoesRoutes);
router.use("/admin", adminRoutes);
router.use("/wishlist", wishlistRoutes);

module.exports.router = router;
module.exports.healthCheck = healthCheck;
