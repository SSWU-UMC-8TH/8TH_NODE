import {
    checkMissionExists,
    checkDuplicateChallenge,
    addChallenge,
    getChallengesByUserId,
    completeChallenge as completeChallengeRepo
} from "../repositories/challenge.repository.js";
import { CompletedMissionError, ChallengeNotFoundError } from "../errors.js";
import { prisma } from "../db.config.js"

// 사용자의 미션 도전을 생성 (중복 도전 및 존재 여부 확인 포함)
export const createChallenge = async (missionId, userId) => {
    const missionExists = await checkMissionExists(missionId);
    if (!missionExists) {
        throw new Error("존재하지 않는 미션입니다.");
    }

    const alreadyChallenged = await checkDuplicateChallenge(userId, missionId);
    if (alreadyChallenged) {
        throw new Error("이미 도전 중입니다.");
    }

    const challengeId = await addChallenge(userId, missionId);
    return challengeId;
};

// 특정 사용자의 미션 목록을 조회
export const listUserChallenges = async (userId) => {
    return await getChallengesByUserId(userId);
};

// 특정 도전을 완료 처리 (중복 완료 및 존재 여부 확인 포함)
export const completeChallenge = async (challengeId) => {
    const challenge = await prisma.userMission.findUnique({
        where: { id: challengeId },
    });

    if (!challenge) {
        throw new ChallengeNotFoundError();
    }

    if (challenge.status === "completed") {
        throw new CompletedMissionError();
    }

    return await completeChallengeRepo(challengeId);
};