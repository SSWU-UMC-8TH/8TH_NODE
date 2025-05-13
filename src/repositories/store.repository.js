import { prisma } from "../db.config.js";

// 가게 추가
export const addStore = async ({ regionId, name, address, score }) => {
  const store = await prisma.store.create({
    data: {
      name,
      address,
      description: `지역 ID: ${regionId}, 점수: ${score}`,
    },
  });
  return store.id;
};

// 가게 조회
export const getStoreById = async (storeId) => {
  return await prisma.store.findUnique({ where: { id: storeId } });
};

// 가게 존재 여부 확인
export const checkStoreExist = async (storeId) => {
  const store = await prisma.store.findUnique({ where: { id: storeId } });
  return store !== null;
};
