import { addStore } from "../repositories/store.repository.js";

export const createStoreService = async (storeData) => {
    return await addStore(storeData);
}

export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviews(reviews);
};