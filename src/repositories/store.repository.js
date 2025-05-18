import { prisma } from "../db.config.js";

// 새로운 가게 DB에 INSERT하고, 삽입된 정보를 객체로 반환 
export const addStore = async({name, address, regionId}) => {
    const createdStore = await prisma.store.create({
        data: {
            name,
            address,
            regionId,
        },
    });
    return {
        id: createdStore.id,
        name: createdStore.name,
        address: createdStore.address,
        regionId : createdStore.regionId,
    };
};


// 특정 가게 ID가 존재하는지 확인
export const isStoreExist = async(storeId) => {
    const store = await prisma.store.findUnique({
        where:{id:storeId},
        select : {id:true}, 
    });
    return !!store;
};

export const getMissionsByStoreId = async(storeId) => {
    const missions = await prisma.mission.findMany({
        where:{
            storeId:storeId,
        },
        orderBy:{
            createdAt:"desc",
        },
        select:{
            id:true,
            reward:true,
            deadline:true,
            missionSpec:true,
        }
    });
    return missions;
}