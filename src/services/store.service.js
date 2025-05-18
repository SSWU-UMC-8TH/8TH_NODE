import { getAllStoreReviews } from "../repositories/user.repository.js";
import { responseFromReviews } from "../dtos/store.dto.js";
import { addStore } from "../repositories/store.repository.js";
import { StoreCreateError } from "../errors.js";

export const storeCreate = async (dto) => {
  try {
    const store = await addStore(dto);
    return store;
  } catch (error) {
    throw new StoreCreateError("가게 생성 중 오류 발생", error.message);
  }
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};