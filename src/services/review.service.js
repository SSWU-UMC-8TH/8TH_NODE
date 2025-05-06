import { checkStoreExists, addReview } from "../repositories/review.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";

export const createReview = async (storeId, reviewData) => {
    const exists = await checkStoreExists(storeId);
    if (!exists) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    const reviewId = await addReview(storeId, reviewData);
    return reviewId;
};

export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviews(reviews);
};