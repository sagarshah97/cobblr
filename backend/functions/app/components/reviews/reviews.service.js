//Author : jayant Patidar

const ReviewDAL = require("./reviews.dal");

class ReviewService {
  constructor() {
    this.reviewsDAL = new ReviewDAL();
  }

  async addReview(reviewData) {
    try {
      const newReview = await this.reviewsDAL.addReview(reviewData);
      return newReview;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }
  async updateReview(_reviewId, updatedData) {
    try {
      const existingReview = await this.reviewsDAL.getReviewByReviewId(
        _reviewId
      );
      if (!existingReview) {
        throw new Error("Review not found");
      }

      const updatedReview = { ...existingReview.toObject(), ...updatedData };
      const savedReview = await this.reviewsDAL.updateReview(
        existingReview._id,
        updatedReview
      );
      return savedReview;
    } catch (error) {
      throw error;
    }
  }

  async getReviewIdByShoeId(shoeId) {
    try {
      const review = await this.reviewsDAL.getReviewIdByShoeId(shoeId);
      return review ? review._id : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteReview(reviewId) {
    try {
      const deletedReview = await this.reviewsDAL.deleteReview(reviewId);
      return deletedReview;
    } catch (error) {
      throw error;
    }
  }

  async getReviewByReviewId(_reviewId) {
    try {
      const review = await this.reviewsDAL.getReviewByReviewId(_reviewId);
      return review;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async getReviewByShoeId(_shoeId) {
    try {
      const reviews = await this.reviewsDAL.getReviewByShoeId(_shoeId);
      return reviews;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async getReviewByUserId(userId) {
    try {
      const reviews = await this.reviewsDAL.getReviewByUserId(userId);
      return reviews;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async getAllReviews() {
    try {
      const allReviews = await this.reviewsDAL.getAllReviews();
      return allReviews;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async getReviewsByUserAndShoe(postedBy, shoeId) {
    try {
      const review = await this.reviewsDAL.getReviewsByUserAndShoe(
        postedBy,
        shoeId
      );
      return review;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ReviewService;
