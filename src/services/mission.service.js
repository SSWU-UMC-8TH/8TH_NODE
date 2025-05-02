import { checkStoreExists, addMission } from "../repositories/mission.repository.js";

export const createMission = async (storeId, missionData) => {
    const exists = await checkStoreExists(storeId);
    if (!exists) {
        throw new Error("존재하지 않는 가게입니다.");
    }
    const missionId = await addMission(storeId, missionData);
    return missionId;
};