const express = require("express");
const router = express.Router();
const shoesRoutes = require("./shoes/shoes.route");
const userRoutes = require("./users/users.route");

const healthCheck = (request, response) => {
  response.status(200).send({
    status: true,
  });
};

router.use("/shoes", shoesRoutes);
router.use("/users", userRoutes);

module.exports.router = router;
module.exports.healthCheck = healthCheck;
