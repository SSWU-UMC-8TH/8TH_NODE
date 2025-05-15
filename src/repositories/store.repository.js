import { prisma } from "../db.config.js";

// 해당 region이 존재하는지 확인
export const checkRegionExists = async (regionId) => {
    const region = await prisma.region.findUnique({ where: { id: regionId } });
    return region !== null;
};

// store 등록
export const addStore = async (data) => {
    const store = await prisma.store.create({
        data: {
            regionId: data.regionId,
            name: data.name,
            address: data.address,
            categoryId: data.categoryId,
        },
    });
    return store.id;
};
