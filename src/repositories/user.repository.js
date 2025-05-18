import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 사용자 추가
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) return null;

  const created = await prisma.user.create({ data });
  return created.id;
};

// 사용자 조회
export const getUser = async (userId) => {
  return await prisma.user.findFirstOrThrow({ where: { id: userId } });
};

// 사용자 존재 여부 확인
export const checkUserExist = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user !== null;
};

// 사용자 선호 카테고리 추가
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId,
      foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 조회
export const getUserPreferencesByUserId = async (userId) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId },
    orderBy: { foodCategoryId: "asc" },
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
  });
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { id: true, content: true, store: true, user: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};