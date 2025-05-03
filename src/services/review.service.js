import {
    addReview,
    checkStoreExist,
    checkUserExist,
  } from "../repositories/review.repository.js";
  
  export const handleCreateReview = async ({ user_id, store_id, body, score }) => {
    const storeExists = await checkStoreExist(store_id);
    if (!storeExists) {
      throw new Error("존재하지 않는 가게입니다.");
    }
  
    const userExists = await checkUserExist(user_id);
    if (!userExists) {
      throw new Error("존재하지 않는 사용자입니다.");
    }
  
    const reviewId = await addReview({ user_id, store_id, body, score });
    return { id: reviewId, user_id, store_id, body, score };
  };
  