import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/challenge.dto.js";
import { createChallenge, listUserChallenges, completeChallenge } from "../services/challenge.service.js";

// 사용자가 특정 미션에 도전하도록 챌린지를 생성하는 핸들러
export const handleCreateChallenge = async (req, res) => {
    try {
        const missionId = parseInt(req.params.missionId);
        const { userId } = bodyToChallenge(req.body);
        const id = await createChallenge(missionId, userId);
        res.status(StatusCodes.CREATED).json({ id });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

// 특정 사용자의 미션 목록을 조회하는 핸들러
export const handleListUserChallenges = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const challenges = await listUserChallenges(userId);
        res.status(StatusCodes.OK).success(challenges);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

// 사용자가 도전 중인 미션을 완료 처리하는 핸들러
export const handleCompleteChallenge = async (req, res, next) => {
    try {
        const challengeId = parseInt(req.params.challengeId);
        const id = await completeChallenge(challengeId);
        res.status(StatusCodes.OK).success({ id, message: "미션이 완료되었습니다." });
    } catch (err) {
        next(err);
    }
};