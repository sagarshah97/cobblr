//Author : jayant Patidar

const express = require("express");

const { authenticateJwt } = require("../../helpers/jwt");
const { validate } = require("../../lib/expressValidation");

const reviewsController = require("./reviews.controller");
const reviewsValidation = require("./reviews.validation");

const router = express.Router();

// get all the reviews
router
  .route("/getAllReviews")
  .get(reviewsController.getAllReviews.bind(reviewsController));

// get  reviews record based on shoe id
router
  .route("/getReviewsByShoeId")
  .post(reviewsController.getReviewByShoeId.bind(reviewsController));

router
  .route("/getReviewsByUserId")
  .post(
    validate(reviewsValidation.getReviewByUserId),
    reviewsController.getReviewByUserId.bind(reviewsController)
  );

// get single review record based on review id
router
  .route("/getReviewsByReviewId")
  .post(reviewsController.getReviewByReviewId.bind(reviewsController));

// create new review
router
  .route("/addReview")
  .post(
    validate(reviewsValidation.addReview),
    reviewsController.addReview.bind(reviewsController)
  );

router
  .route("/updateReview/:reviewId")
  .post(
    validate(reviewsValidation.updateReview),
    reviewsController.updateReview.bind(reviewsController)
  );

router
  .route("/deleteReviews/:reviewId")
  .delete(reviewsController.deleteReview.bind(reviewsController));

// Add a new route to find the review ID by shoe ID
router
  .route("/getReviewIdByShoeId")
  .post(
    validate(reviewsValidation.getReviewIdByShoeId),
    reviewsController.getReviewIdByShoeId.bind(reviewsController)
  );

router
  .route("/getReviewsByShoeIdUserId")
  .post(reviewsController.getReviewsByUserAndShoe.bind(reviewsController));

module.exports = router;
