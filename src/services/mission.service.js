import { isStoreExist } from "../repositories/store.repository.js"; 
import { addMission } from "../repositories/mission.repository.js";

export const createMissionService = async (storeId, missionData) => {
  const storeExists = await isStoreExist(storeId);
  if (!storeExists) {
    throw new Error("미션을 추가하려는 가게가 존재하지 않습니다.");
  }

  const result = await addMission({ ...missionData, storeId });
  return result;
};
