import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/challenge.dto.js";
import { createChallenge, listUserChallenges, completeChallenge } from "../services/challenge.service.js";

// 사용자가 특정 미션에 도전하도록 챌린지를 생성하는 핸들러
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

// 특정 사용자의 미션 목록을 조회하는 핸들러
export const handleListUserChallenges = async (req, res) => {
    /*
#swagger.summary = '사용자가 진행 중인 미션 목록 리뷰 목록 API';
#swagger.responses[200] = {
  description: "사용자 미션 목록 조회 성공 응답",
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
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "yyyy-mm-ddT00:00:00.000Z"
                    },
                    mission: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        reward: { type: "string" },
                        missionSpec: { type: "string" },
                        deadline: {
                          type: "string",
                          format: "date-time",
                          example: "yyyy-mm-ddT00:00:00.000Z"
                        },
                        store: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            name: { type: "string" }
                          }
                        }
                      }
                    }
                  }
                }
              },
              pagination: {
                type: "object",
                properties: {
                  cursor: { type: "number", nullable: true }
                }
              }
            }
          }
        }
      }
    }
  }
};
#swagger.responses[404] = {
      description: "존재하지 않는 사용자의 미션 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
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
      description: "유효하지 않는 userID의 미션 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U003" },
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
    try {
        const userId = parseInt(req.params.userId);
        const challenges = await listUserChallenges(userId);
        res.status(StatusCodes.OK).success(challenges);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

// 사용자가 도전 중인 미션을 완료 처리하는 핸들러
export const handleCompleteChallenge = async (req, res, next) => {
    /*
    #swagger.summary = '미션 완료 API';
    #swagger.responses[200] = {
      description: "사용자 미션 완료 처리 성공 응답",
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
                        success: { type: "object", properties: { id: { type: "number" }, message: { type: "string" } } },
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
          description: "존재하지 않는 미션일 때 응답",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  resultType: { type: "string", example: "FAIL" },
                  error: {
                    type: "object",
                    properties: {
                      errorCode: { type: "string", example: "U007" },
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
          description: "이미 완료된 미션일 때 실패 응답",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  resultType: { type: "string", example: "FAIL" },
                  error: {
                    type: "object",
                    properties: {
                      errorCode: { type: "string", example: "U006" },
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
    try {
        const challengeId = parseInt(req.params.challengeId);
        const id = await completeChallenge(challengeId);
        res.status(StatusCodes.OK).success({ id, message: "미션이 완료되었습니다." });
    } catch (err) {
        next(err);
    }
};