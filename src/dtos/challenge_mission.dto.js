export function bodyToChallengeMissionDto(body) {
    return {
      userId: body.userId,
      missionId: body.missionId
    };
  }
  