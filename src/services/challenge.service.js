import {
    checkMissionExists,
    checkDuplicateChallenge,
    addChallenge,
} from "../repositories/challenge.repository.js";

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