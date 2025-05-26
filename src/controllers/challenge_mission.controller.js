import { challengeMission } from "../services/challenge_mission.service.js";
import { bodyToChallengeMissionDto } from "../dtos/challenge_mission.dto.js";
import { StatusCodes } from "http-status-codes";

export async function handleChallengeMission(req, res) {
    /*
    #swagger.summary = '미션 도전 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "number" },
              missionId: { type: "number" }
            },
            required: ["userId", "missionId"]
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: "미션 도전 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "object",
                properties: {
                  challengeId: { type: "number" },
                  userId: { type: "number" },
                  missionId: { type: "number" },
                  status: { type: "string", example: "IN_PROGRESS" },
                  challengedAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "미션 도전 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: { type: "string", example: "미션 도전 중 오류 발생: 중복 도전 불가" }
            }
          }
        }
      }
    }
  */
  try {
    const dto = bodyToChallengeMissionDto(req.body);
    const result = await challengeMission(dto);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: `미션 도전 중 오류 발생: ${err.message}` });
  }
}
