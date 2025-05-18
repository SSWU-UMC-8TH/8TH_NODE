import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/challenges.dto.js";
import { createMissionChallenge } from "../services/challenges.service.js";
import { getUserChallenges } from "../services/challenges.service.js";
import { completeUserMission } from "../services/challenges.service.js";

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

export const handleUserChallengeList = async(req, res, next) =>{
    try{
        const userId = parseInt(req.params.userId);
        const challenges = await getUserChallenges(userId); // 서비스 호출

        res.status(200).json({data: challenges});
    } catch(error){
        next(error);
    }
}

export const handleCompleteChallenge = async(req, res, next) =>{
    try{
        const missionId = parseInt(req.params.missionId);
        const {userId} = req.body;

        const result = await completeUserMission(userId, missionId);

        res.status(200).json({message:"미션 완료 처리 성공", result});
    } catch(error) {
        next(error);
    }
};