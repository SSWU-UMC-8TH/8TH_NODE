import { checkStoreExists, addReview } from "../repositories/review.repository.js";

export const createReview = async (storeId, reviewData) => {
    const exists = await checkStoreExists(storeId);
    if (!exists) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    const reviewId = await addReview(storeId, reviewData);
    return reviewId;
};