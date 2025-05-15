import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview, listStoreReviews, listUserReviews } from "../services/review.service.js";

export const handleCreateReview = async (req, res) => {
    try {
        const storeId = parseInt(req.params.storeId);
        const reviewData = bodyToReview(req.body);
        const id = await createReview(storeId, reviewData);
        res.status(StatusCodes.CREATED).json({ id });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

export const handleListStoreReviews = async (req, res, next) => {
    const storeId = parseInt(req.params.storeId);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json(reviews);
};

export const handleListUserReviews = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

        const reviews = await listUserReviews(userId, cursor);
        res.status(StatusCodes.OK).json(reviews);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};