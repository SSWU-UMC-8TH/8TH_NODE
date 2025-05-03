import { addReview } from "../repositories/review.respository.js";
import { isStoreExist } from "../repositories/store.repository.js"; 

export const createReviewService = async (storeId, reviewData) => {
  const storeExists = await isStoreExist(storeId);
  if (!storeExists) {
    throw new Error("리뷰를 작성하려는 가게가 존재하지 않습니다.");
  }

  const result = await addReview({ ...reviewData, storeId });
  return result;
};
