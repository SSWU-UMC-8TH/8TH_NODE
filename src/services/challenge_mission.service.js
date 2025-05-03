import { addChallengeMission, isAlreadyChallenging } from "../repositories/challenge_mission.repository.js";

export const challengeMission = async (data) => {
  const alreadyChallenging = await isAlreadyChallenging(data.userId, data.missionId);
  if (alreadyChallenging) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  return await addChallengeMission(data);
}
