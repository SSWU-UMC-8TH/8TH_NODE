import { addMission, getStoreById } from "../repositories/mission.repository.js";

export const createMission = async (data) => {
  const store = await getStoreById(data.storeId);
  if (!store) throw new Error("존재하지 않는 가게입니다.");

  const missionId = await addMission(data);
  return {
    id: missionId,
    ...data,
  };
};
