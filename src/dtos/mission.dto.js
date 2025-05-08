  // 클라이언트 -> 서버 
  export const bodyToMission = (body, storeId) => {
    const deadline = new Date(body.deadline);

    return {
      reward: body.reward,
      missionSpec:body.missionSpec,
      storeId: parseInt(storeId),
      deadline,
    };
  };