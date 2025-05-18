import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 리뷰 추가
export const addReview = async (reviewData) => {
  return await prisma.review.create({
    data: {
      content: reviewData.content,
      rating: reviewData.rating,    
      userId: reviewData.userId,       
      storeId: reviewData.storeId,      
    },
  });
};

// 특정 가게의 리뷰 조회 (cursor 기반 페이징)
export const getAllStoreReviews = async (storeId, cursor) => {
  return await prisma.review.findMany({
    where: {
      storeId,
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
    select: {
      id: true,
      content: true,
      user: true,
      store: true,
    },
  });
};

// 내가 작성한 리뷰 목록 조회
export const getUserReviews = async (userId) => {
  return await prisma.review.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      content: true,
      rating: true,
      createdAt: true,
      store: {
        select: {
          name: true,
        },
      },
      images: {
        select: {
          imageUrl: true,
        },
      },
    },
  });
};
