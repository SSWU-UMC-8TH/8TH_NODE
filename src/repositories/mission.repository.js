import { prisma } from "../db.config.js";

export const addMission = async ({reward, missionSpec, storeId, deadline}) => {
    const createdMission = await prisma.mission.create({
        data:{
            storeId, 
            reward,
            deadline,
            missionSpec,
        },
    });

    return {
        id : createdMission.id,
        storeId: createdMission.storeId,
        reward: createdMission.reward,
        deadline: createdMission.deadline,
        missionSpec: createdMission.missionSpec,
    };
};