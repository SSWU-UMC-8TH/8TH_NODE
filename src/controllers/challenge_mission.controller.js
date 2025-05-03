import { challengeMission } from "../services/challenge_mission.service.js";
import { bodyToChallengeMissionDto } from "../dtos/challenge_mission.dto.js";
import { StatusCodes } from "http-status-codes";

export async function handleChallengeMission(req, res) {
  try {
    const dto = bodyToChallengeMissionDto(req.body);
    const result = await challengeMission(dto);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: `미션 도전 중 오류 발생: ${err.message}` });
  }
}
