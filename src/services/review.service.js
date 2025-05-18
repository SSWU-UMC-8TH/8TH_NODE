import { addReview, getUserReviews } from '../repositories/review.repository.js';
import { ReviewCreateError } from "../errors.js";

export async function reviewCreate(data) {
  try {
    const reviewId = await addReview(data);
    return reviewId;
  } catch (error) {
    throw new ReviewCreateError("리뷰 생성 중 오류가 발생했습니다.", {
      originalError: error.message,
      input: data,
    });
  }
}

export const getUserReviewsService = async (userId) => {
  return await getUserReviews(userId);
};

