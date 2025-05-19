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
        missionId: parseInt(createdChallenge.missionId),
        status : createdChallenge.status
    };
};

export const isAlreadyChallenged = async({userId, missionId}) => {
    const challenge = await prisma.userMission.findFirst({
        where:{
            userId,
            missionId,
            status:"IN_PROGRESS",
        },
        select: {id:true},
    });
    return !!challenge;
};

export const isMissionExist = async(missionId) => {
    const mission = await prisma.Mission.findUnique({
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

export const isAlreadyCompleted = async({userId, missionId}) => {
    const mission = await prisma.userMission.findMany({
        where: {
            userId,
            missionId,
            status:"COMPLETE",
        },
    });
    return mission.length > 0;
}

export const completeUserMissionStatus= async({userId, missionId})=> {
    const updated = await prisma.userMission.updateMany({
        where:{
            userId,
            missionId,
            status:"IN_PROGRESS",
        },
        data:{
            status:"COMPLETE",
        }
    })
    return updated;
}