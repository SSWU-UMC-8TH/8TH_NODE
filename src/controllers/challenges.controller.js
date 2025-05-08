import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/challenges.dto.js";
import { createMissionChallenge } from "../services/challenges.service.js";

export const handleAddChallenge = async (req, res, next) => {
    try {
        const missionId = parseInt(req.params.missionId);
        const challengeData = bodyToChallenge(req.body, missionId);

        const result = await createMissionChallenge(challengeData.userId, { missionId: challengeData.missionId });

        res.status(StatusCodes.CREATED).json({result});
    } catch(err){
        next(err);
    }
};