import { addStore } from "../repositories/store.repository.js";

export const createStoreService = async (storeData) => {
    return await addStore(storeData);
}