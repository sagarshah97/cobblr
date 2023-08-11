//Author : jayant Patidar

const Review = require("./reviews.model");

class ReviewDAL {
  async addReview(reviewData) {
    try {
      const newReview = await Review.create(reviewData);
      return newReview;
    } catch (error) {
      throw error;
    }
  }

  async updateReview(_reviewId, updatedData) {
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        _reviewId,
        updatedData,
        { new: true }
      );
      return updatedReview;
    } catch (error) {
      throw error;
    }
  }

  async getReviewByShoeId(shoeId) {
    try {
      const review = await Review.find({ shoeId });
      return review;
    } catch (error) {
      throw error;
    }
  }

  async deleteReview(reviewId) {
    try {
      const deletedReview = await Review.findByIdAndDelete(reviewId);
      return deletedReview;
    } catch (error) {
      throw error;
    }
  }

  async getAllReviews() {
    const allReviews = Review.find({});
    return allReviews;
  }

  async getReviewByReviewId(_reviewId) {
    try {
      const review = await Review.findById(_reviewId);
      return review;
    } catch (error) {
      throw error;
    }
  }

  async getReviewIdByShoeId(shoeId) {
    try {
      const review = await Review.findOne({ shoeId }, { _id: 1 });
      return review ? review._id : null;
    } catch (error) {
      throw error;
    }
  }

  async getReviewByUserId(userId) {
    const reviews = await Review.find({ postedBy: userId });
    return reviews;
  }

  async getReviewsByUserAndShoe(postedBy, shoeId) {
    try {
      const review = await Review.find({ postedBy: postedBy, shoeId });
      return review;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ReviewDAL;
