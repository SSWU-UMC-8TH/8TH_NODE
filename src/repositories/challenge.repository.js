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

// 내가 진행 중인 미션 목록
export const getChallengesByUserId = async (userId) => {
    return await prisma.userMission.findMany({
        where: {
            userId,
            status: "in_progress", // 진행 중인 미션만 필터링
        },
        select: {
            id: true,
            createdAt: true,
            mission: {
                select: {
                    id: true,
                    reward: true,
                    missionSpec: true,
                    deadline: true,
                    store: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

// 진행 중인 미션을 진행 완료로 바꾸기
export const completeChallenge = async (challengeId) => {
    const updated = await prisma.userMission.update({
        where: { id: challengeId },
        data: { status: "completed" },
    });
    return updated.id;
};
