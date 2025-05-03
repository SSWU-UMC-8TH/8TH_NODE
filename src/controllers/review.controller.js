import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { handleCreateReview } from "../services/review.service.js";

export const createReview = async (req, res, next) => {
  try {
    const reviewData = bodyToReview(req.body); // 변환 적용
    const review = await handleCreateReview(reviewData);

    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};
