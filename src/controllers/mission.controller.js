import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission, listStoreMissions } from "../services/mission.service.js";

export const handleCreateMission = async (req, res) => {
    try {
        const storeId = parseInt(req.params.storeId);
        const missionData = bodyToMission(req.body);
        const id = await createMission(storeId, missionData);
        res.status(StatusCodes.CREATED).json({ id });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};


export const handleListStoreMissions = async (req, res) => {
    try {
        const storeId = parseInt(req.params.storeId);
        const missions = await listStoreMissions(storeId);
        res.status(StatusCodes.OK).json(missions);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};