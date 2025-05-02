import { addStore, checkRegionExists } from "../repositories/store.repository.js";

export const createStore = async (storeData) => {
    const regionExists = await checkRegionExists(storeData.regionId);
    if (!regionExists) {
        throw new Error("존재하지 않는 지역입니다.");
    }
    const storeId = await addStore(storeData);
    return storeId;
};
