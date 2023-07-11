const express = require("express");
const router = express.Router();
const shoesRoutes = require("./shoes/shoes.route");
const faqRoutes = require("./faq/faq.route");
const userRoutes = require("./users/users.route");

const healthCheck = (request, response) => {
  response.status(200).send({
    status: true,
  });
};

router.use("/shoes", shoesRoutes);
router.use("/faq", faqRoutes);
router.use("/users", userRoutes);

module.exports.router = router;
module.exports.healthCheck = healthCheck;
