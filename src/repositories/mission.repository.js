import { prisma } from "../db.config.js";

export const getStoreById = async (storeId) => {
  return await prisma.store.findUnique({
    where: { id: storeId },
  });
};

// 미션 추가
export const addMission = async (missionData) => {
  const mission = await prisma.mission.create({
    data: {
      storeId: missionData.storeId,
      reward: missionData.reward,
      deadline: missionData.deadline,
      missionSpec: missionData.missionSpec,
    },
  });

  return {
    id: mission.id,
    ...missionData,
  };
};

export const getMissionsByStoreId = async (storeId) => {
  return await prisma.mission.findMany({
    where: { storeId: Number(storeId) },
    select: {
        id: true,
        reward: true,
        deadline: true,
        missionSpec: true,
        createdAt: true
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

// 진행 중인 미션 조회
export const getInProgressMissionsByUserId = async (userId) => {
  return await prisma.userMission.findMany({
    where: {
      userId: Number(userId),
      status: "in_progress"
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      mission: {
        select: {
          id: true,
          missionSpec: true,
          reward: true,
          deadline: true,
          store: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};
