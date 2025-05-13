// 특정 가게의 미션 목록 조회 응답 DTO
export class MissionResponseDto {
  constructor(missionData) {
    this.id = missionData.id;
    this.reward = missionData.reward;
    this.deadline = missionData.deadline;
    this.missionSpec = missionData.missionSpec;
    this.createdAt = missionData.createdAt;
  }
}

// 내가 진행 중인 미션 목록 조회 응답 DTO
export class InProgressMissionResponseDto {
  constructor(missionData) {
    this.id = missionData.id;
    this.status = missionData.status;
    this.createdAt = missionData.createdAt;
    this.missionSpec = missionData.mission.missionSpec;
    this.reward = missionData.mission.reward;
    this.deadline = missionData.mission.deadline;
    this.storeName = missionData.mission.store.name;
  }
}
