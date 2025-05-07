import { prisma } from "../db.config.js";

// 가게 존재 여부 확인
export const checkStoreExists = async (storeId) => {
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    return store !== null;
};

// 리뷰 등록
export const addReview = async (storeId, data) => {
    const review = await prisma.userStoreReview.create({
        data: {
            userId: data.userId,
            storeId: storeId,
            content: data.body,
            score: data.score,
        },
    });
    return review.id;
};

// 리뷰 가져오기
export const getAllStoreReviews = async (storeId, cursor = 0) => {
    const reviews = await prisma.userStoreReview.findMany({
        select: { id: true, content: true, store: true, user: true },
        where: { storeId: storeId, id: { gt: cursor } },
        orderBy: { id: "asc" },
        take: 5,
    });
    return reviews;
};