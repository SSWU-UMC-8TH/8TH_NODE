import { checkStoreExistsForMission, addMission, getMissionsByStoreId } from "../repositories/mission.repository.js";
import { StoreNotFoundError } from "../errors.js";
import { prisma } from "../db.config.js";

// 특정 가게에 미션을 등록 (가게 존재 여부 확인 포함)
export const createMission = async (storeId, missionData) => {
    const exists = await checkStoreExistsForMission(storeId);
    if (!exists) {
        throw new Error("존재하지 않는 가게입니다.");
    }
    const missionId = await addMission(storeId, missionData);
    return missionId;
};


// 특정 가게의 미션 목록을 조회 (가게 존재 여부 확인 포함)
export const listStoreMissions = async (storeId) => {
    // 존재하는 가게인지 확인
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
        throw new StoreNotFoundError();
    }
    return await getMissionsByStoreId(storeId);
};