// Author: Sagar Paresh Shah (B00930009)

const express = require("express");
const router = express.Router();
const shoesRoutes = require("./shoes/shoes.route");
const faqRoutes = require("./faq/faq.route");
const userRoutes = require("./users/users.route");
const contactRoutes = require("./contact/contact.route");
const orderRoutes = require("./orders/orders.route");
const reviewRoutes = require("./reviews/reviews.route");
const adminRoutes = require("./admin/admin.route");
const wishlistRoutes = require("./wishlist/wishlist.route");
const cartRoutes = require("./cart/cart.route");
const orderHistory = require("./orderhistory/orderhistory.route");
const filterRoutes = require("./filter/filter.route");
const billingRoutes = require("./billings/billings.route");
const storeRoutes = require("./stores/stores.route");
const homeRoutes = require("./home/home.route");

const healthCheck = (request, response) => {
  response.status(200).send({
    status: true,
  });
};

router.use("/shoes", shoesRoutes);
router.use("/faq", faqRoutes);
router.use("/users", userRoutes);
router.use("/contact", contactRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);
router.use("/admin", adminRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);
router.use("/orderhistory", orderHistory);
router.use("/filter", filterRoutes);
router.use("/billing", billingRoutes);
router.use("/stores", storeRoutes);
router.use("/brandname", homeRoutes);

module.exports.router = router;
module.exports.healthCheck = healthCheck;
