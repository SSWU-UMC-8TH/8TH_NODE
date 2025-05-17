import {
    checkMissionExists,
    checkDuplicateChallenge,
    addChallenge,
    getChallengesByUserId,
    completeChallenge as completeChallengeRepo
} from "../repositories/challenge.repository.js";
import { CompletedMissionError, ChallengeNotFoundError } from "../errors.js";
import { prisma } from "../db.config.js"

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

export const listUserChallenges = async (userId) => {
    return await getChallengesByUserId(userId);
};

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