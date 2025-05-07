import { prisma } from "../db.config.js";

// 가게 존재 여부 확인
export const checkStoreExistsForMission = async (storeId) => {
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    return store !== null;
};

// 미션 등록
export const addMission = async (storeId, data) => {
    const mission = await prisma.mission.create({
        data: {
            storeId: storeId,
            reward: data.reward,
            deadline: data.deadline,
            missionSpec: data.missionSpec,
        },
    });
    return mission.id;
};
