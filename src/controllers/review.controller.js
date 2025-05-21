import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview, listStoreReviews, listUserReviews } from "../services/review.service.js";
import { InvalidUserIdFormatError } from "../errors.js";

// 특정 가게에 대한 리뷰를 작성하는 핸들러
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

// 특정 가게에 등록된 리뷰 목록을 조회하는 핸들러
export const handleListStoreReviews = async (req, res, next) => {
    const storeId = parseInt(req.params.storeId);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json(reviews);
};

// 특정 사용자가 작성한 리뷰 목록을 조회하는 핸들러
export const handleListUserReviews = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId);
        // 유효성 확인
        if (isNaN(userId)) {
            throw new InvalidUserIdFormatError();
        }
        const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

        const reviews = await listUserReviews(userId, cursor);
        res.status(StatusCodes.OK).success(reviews);
    } catch (err) {
        next(err);
    }
};