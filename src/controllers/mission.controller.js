import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission, listStoreMissions } from "../services/mission.service.js";
import { InvalidStoreIdFormatError } from "../errors.js";

// 특정 가게에 새로운 미션을 등록하는 핸들러
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

// 특정 가게의 모든 미션 목록을 조회하는 핸들러
export const handleListStoreMissions = async (req, res, next) => {
    try {
        /*
#swagger.summary = '특정 가게의 미션 목록을 조회하는 API';
#swagger.responses[200] = {
  description: "특정 가게 미션 목록 조회 성공 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "SUCCESS" },
          error: { type: "object", nullable: true, example: null },
          success: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    reward: { type: "string"},
                    deadline: {
                      type: "string",
                      format: "date-time",
                      example: "yyyy-mm-ddT00:00:00.000Z"
                    },
                    missionSpec: { type: "string"},
                  }
                }
              },
            }
          }
        }
      }
    }
  }
};
#swagger.responses[404] = {
      description: "존재하지 않는 가게의 리뷰 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U004" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "유효하지 않는 storeID의 리뷰 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U005" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
*/
        res.status(StatusCodes.OK).success(missions);
    } catch (err) {
        next(err);
    }
};