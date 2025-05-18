import { prisma } from "../db.config.js";

export const addChallenge = async ({userId, missionId}) => {
    const createdChallenge = await prisma.userMission.create({
        data:{
            userId, 
            missionId,
            status:"IN_PROGRESS",
        },
    });
    return {
        id:createdChallenge.id,
        userId: createdChallenge.userId,
        missionId: createdChallenge.missionId,
        status : createdChallenge.status
    };
};

export const isAlreadyChallenged = async({userId, missionId}) => {
    const challenge = await prisma.userMission.findFirst({
        where:{
            userId,
            missionId,
        },
        select: {id:true},
    });
    return !!challenge;
};

export const isMissionExist = async(missionId) => {
    const mission = await prisma.userMission.findUnique({
        where: {id:missionId},
        select: {id:true},
    });
    return !!mission;
};

export const getChallengesByUserId = async(userId) => {
    return await prisma.userMission.findMany({
        where:{
            userId:userId,
            status:"IN_PROGRESS",
        },
        orderBy:{
            createdAt:"desc",
        },
        include:{
            mission:{
                select:{
                    id:true,
                    reward:true,
                    deadline:true,
                    missionSpec:true,
                    store:{
                        select:{
                            id:true,
                            name:true,
                            address:true,
                        }
                    }
                }
            }
        }
    })
}