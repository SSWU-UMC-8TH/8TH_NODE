import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/challenge.dto.js";
import { createChallenge, listUserChallenges, completeChallenge } from "../services/challenge.service.js";

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

export const handleListUserChallenges = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const challenges = await listUserChallenges(userId);
        res.status(StatusCodes.OK).json(challenges);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

export const handleCompleteChallenge = async (req, res) => {
    try {
        const challengeId = parseInt(req.params.challengeId);
        const id = await completeChallenge(challengeId);
        res.status(StatusCodes.OK).json({ id, message: "도전이 완료되었습니다." });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};