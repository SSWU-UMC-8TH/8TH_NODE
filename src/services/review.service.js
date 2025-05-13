import * as reviewRepository from '../repositories/review.repository.js';

export const getUserReviewsService = async (userId) => {
  return await reviewRepository.getUserReviews(userId);
};

