import { addChallenge } from "../repositories/challenges.repository.js";
import { isAlreadyChallenged } from "../repositories/challenges.repository.js";
import { isMissionExist } from "../repositories/challenges.repository.js";
import { responseFromChallenges } from "../dtos/challenges.dto.js";
import { getChallengesByUserId } from "../repositories/challenges.repository.js";
import { completeUserMissionStatus } from "../repositories/challenges.repository.js";
import { isAlreadyCompleted } from "../repositories/challenges.repository.js";

export const createMissionChallenge = async (userId, missionData) => {
  const missionId = missionData.missionId;

  const missionExists = await isMissionExist(missionId);
  if (!missionExists) {
    throw new Error("도전하려는 미션이 존재하지 않습니다.");
  }

  // 중복 도전 여부 확인 
  const alreadyChallenged = await isAlreadyChallenged({userId, missionId});
  if(alreadyChallenged){
    throw new Error("이미 도전 중인 미션입니다.");
  }

  // 도전 등록 
  const result = await addChallenge({userId, missionId });
  return result;
};

export const getUserChallenges = async(userId) => {
  const challenges = await getChallengesByUserId(userId);
  return responseFromChallenges(challenges);

}

export const completeUserMission =async(userId, missionId) => {
  const alreadyCompleted = await isAlreadyCompleted(userId, missionId);
  if(alreadyCompleted){
    throw new Error("이미 완료된 미션입니다.");
  }

  const result = await completeUserMissionStatus(userId, missionId);
  return result;
}