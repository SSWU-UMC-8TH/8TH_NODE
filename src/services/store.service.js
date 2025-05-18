import { responseFromMissions, responseFromReviews} from "../dtos/store.dto.js";
import { getAllStoreReviews } from "../repositories/user.repository.js";
import { addStore, getMissionsByStoreId } from "../repositories/store.repository.js";

export const createStoreService = async (storeData) => {
    return await addStore(storeData);
}

export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviews(reviews);
};

export const getStoreMission = async(storeId) => {
    const missions = await getMissionsByStoreId(storeId);
    return responseFromMissions(missions);
}