import { StatusCodes } from "http-status-codes";
import { bodyToMission, responseFromMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";

export const handleMissionCreate = async (req, res, next) => {
  try {
    const missionData = bodyToMission(req.body);
    const mission = await createMission(missionData);
    res.status(StatusCodes.CREATED).json({ result: responseFromMission(mission) });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }
};
