import { addMission, getMissionsByStoreId, getInProgressMissionsByUserId } from "../repositories/mission.repository.js";
import { MissionCreateError } from "../errors.js";

// 미션 생성
export const createMission = async (dto) => {
  try {
      const mission = await addMission(dto);
      return mission;
    } catch (error) {
      throw new MissionCreateError("DB에 미션 추가 중 오류 발생", error);
    }
};

// 특정 가게의 미션 목록 조회
export const getMissionsByStore = async (storeId) => {
  try {
    const missions = await getMissionsByStoreId(storeId);
    return missions;
  } catch (error) {
    throw new Error('미션 목록 조회 중 오류 발생');
  }
};

// 내가 진행 중인 미션 목록 조회
export const getInProgressMissions = async (userId) => {
  try {
    const missions = await getInProgressMissionsByUserId(userId);
    return missions;
  } catch (error) {
    throw new Error('진행 중 미션 조회 중 오류 발생');
  }
};


// 가게의 미션 목록 조회
export const findMissionsByStoreId = async (storeId) => {
  try {
    return await getMissionsByStoreId(storeId); // 이 함수는 이미 레포지토리에서 가져오는 역할을 합니다.
  } catch (error) {
    throw new Error('가게의 미션 목록 조회 중 오류 발생');
  }
};