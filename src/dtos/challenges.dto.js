  // 클라이언트 -> 서버 
  export const bodyToChallenge = (body, missionId) => {

    return {
      userId : body.userId,
      missionId : parseInt(missionId)
    };
  };