import { addReview } from "../repositories/review.repository.js";
import { isStoreExist } from "../repositories/store.repository.js"; 
import { getReviewsByUserId } from "../repositories/review.repository.js";

export const createReviewService = async (storeId, reviewData) => {
  const storeExists = await isStoreExist(storeId);
  if (!storeExists) {
    throw new Error("리뷰를 작성하려는 가게가 존재하지 않습니다.");
  }

  const result = await addReview({ ...reviewData, storeId });
  return result;
};


export const showMyReview = async (userId) => {
  const reviews = await getReviewsByUserId({userId});

  return reviews.map((review) => ({
    id:review.id,
    review:review.body,
    score:review.score,
    createdAt: review.createdAt,
    storeName: review.store.name,
    storeAddress: review.store.address,
  }));
};