import { getMissionsByStore } from "../services/mission.service.js";
import { getInProgressMissions, createMission } from "../services/mission.service.js";
import {  MissionCreateDto, MissionResponseDto, InProgressMissionResponseDto } from "../dtos/mission.dto.js";

// 미션 생성 (가게에 추가)
export const handleMissionCreate = async (req, res, next) => {
  try {
  /*
    #swagger.summary = '미션 생성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "number" },
              title: { type: "string" },
              description: { type: "string" },
              rewardPoint: { type: "number" },
              startDate: { type: "string", format: "date" },
              endDate: { type: "string", format: "date" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "미션 생성 성공 응답",
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
                  mission: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      storeId: { type: "number" },
                      title: { type: "string" },
                      description: { type: "string" },
                      rewardPoint: { type: "number" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "미션 생성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */
    const dto = new MissionCreateDto(req.body);
    const mission = await createMission(dto);
    const responseDto = new MissionResponseDto(mission);
    res.status(200).success({ mission: responseDto });
  } catch (error) {
    next(error); // 미들웨어에서 처리
  }
};

// 특정 가게의 미션 목록 조회
export const getStoreMissions = async (req, res) => {
  /*
    #swagger.summary = '특정 가게의 미션 목록 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '가게 ID',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: "미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    title: { type: "string" },
                    description: { type: "string" },
                    rewardPoint: { type: "number" },
                    startDate: { type: "string", format: "date" },
                    endDate: { type: "string", format: "date" }
                  }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: "서버 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "미션 목록 조회 중 오류 발생" }
            }
          }
        }
      }
    }
  */
  const { storeId } = req.params;

  try {
    const missions = await getMissionsByStore(storeId);
    const missionDtos = missions.map(mission => new MissionResponseDto(mission)); // DTO로 변환
    res.status(200).json({ missions: missionDtos });
  } catch (error) {
    console.error('미션 목록 조회 오류:', error);
    res.status(500).json({ message: '미션 목록 조회 중 오류 발생' });
  }
};

// 내가 진행 중인 미션 목록 조회
export const getUserInProgressMissions = async (req, res) => {
  /*
    #swagger.summary = '사용자 진행 중 미션 목록 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: "진행 중 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    missionId: { type: "number" },
                    title: { type: "string" },
                    progress: { type: "string" },
                    deadline: { type: "string", format: "date" }
                  }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: "서버 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "진행 중 미션 조회 중 오류 발생" }
            }
          }
        }
      }
    }
  */
  const { userId } = req.params;

  try {
    const missions = await getInProgressMissions(userId);
    const missionDtos = missions.map(mission => new InProgressMissionResponseDto(mission)); // DTO로 변환
    res.status(200).json({ missions: missionDtos });
  } catch (error) {
    console.error('진행 중 미션 조회 오류:', error);
    res.status(500).json({ message: '진행 중 미션 조회 중 오류 발생' });
  }
};
