export const bodyToMission = (body) => {
    return {
      storeId: parseInt(body.storeId, 10),
      reward: body.reward,
      deadline: body.deadline, // 'YYYY-MM-DD' 형식의 문자열로 전달됨
      missionSpec: body.missionSpec,
    };
  };
  
  export const responseFromMission = (mission) => {
    return {
      id: mission.id,
      storeId: mission.store_id,
      reward: mission.reward,
      deadline: mission.deadline,
      missionSpec: mission.mission_spec,
      createdAt: mission.created_at,
      updatedAt: mission.updated_at,
    };
  };
  