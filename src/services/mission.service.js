import { checkStoreExistsForMission, addMission, getMissionsByStoreId } from "../repositories/mission.repository.js";
import { StoreNotFoundError } from "../errors.js";
import { prisma } from "../db.config.js";

export const createMission = async (storeId, missionData) => {
    const exists = await checkStoreExistsForMission(storeId);
    if (!exists) {
        throw new Error("존재하지 않는 가게입니다.");
    }
    const missionId = await addMission(storeId, missionData);
    return missionId;
};

export const listStoreMissions = async (storeId) => {
    // 존재하는 가게인지 확인
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
        throw new StoreNotFoundError();
    }
    return await getMissionsByStoreId(storeId);
};