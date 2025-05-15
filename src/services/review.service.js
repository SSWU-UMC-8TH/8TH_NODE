import { checkStoreExists, addReview } from "../repositories/review.repository.js";
import { getAllStoreReviews, getUserReviews } from "../repositories/review.repository.js";

import { responseFromReviews } from "../dtos/review.dto.js";

export const createReview = async (storeId, reviewData) => {
    const exists = await checkStoreExists(storeId);
    if (!exists) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    const reviewId = await addReview(storeId, reviewData);
    return reviewId;
};

// 특정 가게의 리뷰 조회
export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviews(reviews);
};

// 특정 사용자가 작성한 리뷰 조회
export const listUserReviews = async (userId, cursor = 0) => {
    const reviews = await getUserReviews(userId, cursor);
    return responseFromReviews(reviews);
};