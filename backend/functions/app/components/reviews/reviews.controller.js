//Author : jayant Patidar

const ReviewService = require("./reviews.service");

class ReviewController {
  constructor() {
    this.reviewService = new ReviewService();
  }

  async getReviewsByUserAndShoe(request, response, next) {
    try {
      const { postedBy, shoeId } = request.body;

      const review = await this.reviewService.getReviewsByUserAndShoe(
        postedBy,
        shoeId
      );
      if (review) {
        response.status(200).json(review);
      } else {
        response
          .status(404)
          .json({ error: "No reviews found for the specified user and shoe." });
      }
    } catch (error) {
      next(error);
    }
  }

  async addReview(request, response, next) {
    const { postedBy, shoeId } = request.body;
    try {
      const review = await this.reviewService.getReviewsByUserAndShoe(
        postedBy,
        shoeId
      );

      if (review && review.length > 0) {
        const updatedReview = await this.reviewService.updateReview(
          review[0]._id,
          request.body
        );
        response.status(200).json(updatedReview);
      } else {
        const newReview = await this.reviewService.addReview(request.body);
        response.status(201).json(newReview);
      }
    } catch (error) {
      next(error);
    }
  }

  async updateReview(request, response, next) {
    try {
      const updatedReview = await this.reviewService.updateReview(
        request.params.reviewId,
        request.body
      );
      response.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  }

  async deleteReview(request, response, next) {
    try {
      const deletedReview = await this.reviewService.deleteReview(
        request.params.reviewId
      );
      response.status(200).json(deletedReview);
    } catch (error) {
      next(error);
    }
  }

  async getReviewByReviewId(request, response, next) {
    try {
      const review = await this.reviewService.getReviewByReviewId(
        request.body._id
      );
      if (review) {
        response.status(200).json(review);
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async getReviewByShoeId(request, response, next) {
    try {
      const reviews = await this.reviewService.getReviewByShoeId(
        request.body.shoeId
      );
      if (reviews) {
        response.status(200).json(reviews);
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async getReviewByUserId(request, response, next) {
    try {
      const reviews = await this.reviewService.getReviewByUserId(
        request.body.userId
      );
      if (reviews) {
        response.status(200).json(reviews);
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllReviews(request, response, next) {
    try {
      const allReviews = await this.reviewService.getAllReviews();
      if (allReviews) {
        response.status(200).json(allReviews);
      } else {
        response.status(404).json({ error: "No records found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async getReviewIdByShoeId(request, response, next) {
    try {
      const { shoeId } = request.body;

      const reviewId = await this.reviewService.getReviewIdByShoeId(shoeId);

      if (reviewId) {
        response.status(200).json({ reviewId: reviewId });
      } else {
        response
          .status(404)
          .json({ error: "No review found for the specified shoe ID." });
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ReviewController();
