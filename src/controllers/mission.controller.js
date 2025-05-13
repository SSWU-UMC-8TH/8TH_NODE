import { getMissionsByStore } from "../services/mission.service.js";
import { getInProgressMissions } from "../services/mission.service.js";
import { MissionResponseDto, InProgressMissionResponseDto } from "../dtos/mission.dto.js";

// 특정 가게의 미션 목록 조회
export const getStoreMissions = async (req, res) => {
  const { storeId } = req.params;

  try {
    const missions = await getMissionsByStore(storeId);
    const missionDtos = missions.map(mission => new MissionResponseDto(mission)); // DTO로 변환
    res.status(200).json({ missions: missionDtos });
  } catch (error) {
    console.error('미션 목록 조회 오류:', error);
    res.status(500).json({ message: '미션 목록 조회 중 오류 발생' });
  }
};

// 내가 진행 중인 미션 목록 조회
export const getUserInProgressMissions = async (req, res) => {
  const { userId } = req.params;

  try {
    const missions = await getInProgressMissions(userId);
    const missionDtos = missions.map(mission => new InProgressMissionResponseDto(mission)); // DTO로 변환
    res.status(200).json({ missions: missionDtos });
  } catch (error) {
    console.error('진행 중 미션 조회 오류:', error);
    res.status(500).json({ message: '진행 중 미션 조회 중 오류 발생' });
  }
};
