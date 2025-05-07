import { prisma } from "../db.config.js";

// 미션 존재 확인
export const checkMissionExists = async (missionId) => {
    const mission = await prisma.mission.findUnique({ where: { id: missionId } });
    return mission !== null;
};

// 도전 중인지 확인
export const checkDuplicateChallenge = async (userId, missionId) => {
    const existing = await prisma.userMission.findFirst({
        where: {
            userId: userId,
            missionId: missionId,
        },
    });
    return existing !== null;
};

// 도전 추가
export const addChallenge = async (userId, missionId) => {
    const challenge = await prisma.userMission.create({
        data: {
            userId: userId,
            missionId: missionId,
            status: 'in_progress',
        },
    });
    return challenge.id;
};