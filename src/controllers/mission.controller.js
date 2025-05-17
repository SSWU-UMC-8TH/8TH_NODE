import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission, listStoreMissions } from "../services/mission.service.js";
import { InvalidStoreIdFormatError } from "../errors.js";

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


export const handleListStoreMissions = async (req, res, next) => {
    try {
        const storeId = parseInt(req.params.storeId);
        // 유효성 확인
        if (isNaN(storeId)) {
            throw new InvalidStoreIdFormatError();
        }
        const missions = await listStoreMissions(storeId);
        res.status(StatusCodes.OK).success(missions);
    } catch (err) {
        next(err);
    }
};