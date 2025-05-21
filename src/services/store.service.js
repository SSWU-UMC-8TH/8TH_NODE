import { addStore, checkRegionExists } from "../repositories/store.repository.js";

// 새로운 가게를 등록 (지역 존재 여부 확인 포함)
export const createStore = async (storeData) => {
    const regionExists = await checkRegionExists(storeData.regionId);
    if (!regionExists) {
        throw new Error("존재하지 않는 지역입니다.");
    }
    const storeId = await addStore(storeData);
    return storeId;
};
