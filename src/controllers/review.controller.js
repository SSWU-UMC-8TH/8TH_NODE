import {getUserReviewsService, reviewCreate} from '../services/review.service.js';
import { responseListFromUserReviews, ReviewCreateDto } from '../dtos/review.dto.js';

export const getUserReviewsController = async (req, res) => {
  const userId = Number(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "유효한 사용자 ID가 아닙니다." });
  }

  try {
    const reviews = await getUserReviewsService(userId);
    const response = responseListFromUserReviews(reviews);
    res.status(200).json({ reviews: response });
  } catch (error) {
    res.status(500).json({ message: "리뷰 조회 중 오류 발생", error: error.message });
  }
};

export async function createReview(req, res, next) {
  try {
    const dto = new ReviewCreateDto(req.body);
    const review = await reviewCreate(dto);
    return res.status(200).success(review);
  } catch (error) {
    next(error);
  }
}