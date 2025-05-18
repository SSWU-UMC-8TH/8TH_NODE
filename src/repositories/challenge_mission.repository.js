import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 미션 중복 도전 여부 확인
export const isAlreadyChallenging = async (userId, missionId) => {
  const challenge = await prisma.userMission.findFirst({
    where: { userId, missionId },
  });
  return challenge !== null;
};

// 미션 도전하기
export const addChallengeMission = async ({ userId, missionId }) => {
  const result = await prisma.userMission.create({
    data: {
      userId,
      missionId,
    },
  });
  return {
    id: result.id,
    userId,
    missionId,
  };
};