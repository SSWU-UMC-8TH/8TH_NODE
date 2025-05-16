import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReviewService } from "../services/review.service.js";
import { showMyReview } from "../repositories/review.repository.js";

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

export const handleShowMyReview = async (req, res, next) => {
    try{
        const userId = parseInt(req.params.userId);
        const reviews = await showMyReview(userId);

        res.status(StatusCodes.OK).json({reviews});
    } catch(error){
        next(error);
    }
};