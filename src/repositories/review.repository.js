import { prisma } from "../db.config.js";

export const addReview = async({userId, review, score, storeId}) => {
    const createdReview = await prisma.review.create({
        data:{
            userId,
            storeId,
            body:review,
            score,
        }
    });
    return {
        id:createdReview.id,
        userId: createdReview.userId,
        storeId: createdReview.storeId,
        review: createdReview.body,
        score: createdReview.score,
    };
};

export const showMyReview = async(userId) => {
    return await prisma.review.findMany({
        where:{userId},
        select: {
            id:true,
            storeId:true,
            body:true,
            score:true,
            createdAt:true,
            store:{
                select:{
                    name:true,
                    address:true
                }
            }
        },
        orderBy:{
            createdAt:"desc",
        }
    })
}