import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMissionService } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
    try {
        const storeId = parseInt(req.params.storeId);
        const missionData = bodyToMission(req.body, storeId);

        const result = await createMissionService(storeId, missionData);

        res.status(StatusCodes.CREATED).success(result);
    } catch(err){
        next(err);
    }
};