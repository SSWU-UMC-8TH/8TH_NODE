import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 가게 추가
export const addStore = async ({ name, address, description }) => {
  return await prisma.store.create({
    data: {
      name,
      address,
      description,
    },
  });
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
