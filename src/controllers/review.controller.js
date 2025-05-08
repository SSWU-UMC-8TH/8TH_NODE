import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReviewService } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
    try {
        const storeId = parseInt(req.params.storeId);
        const reviewData = bodyToReview(req.body, storeId);

        const result = await createReviewService(storeId, reviewData);

        res.status(StatusCodes.CREATED).json({result});
    } catch(err){
        next(err);
    }
};