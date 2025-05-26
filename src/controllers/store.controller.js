import { StatusCodes } from "http-status-codes";
import { listStoreReviews, storeCreate } from "../services/store.service.js";
import { StoreCreateError } from "../errors.js";
import { bodyToStoreCreateDto } from "../dtos/store.dto.js";

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '특정 가게의 리뷰 목록 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '가게 ID',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이징 커서 (옵션)',
      required: false,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    userId: { type: "number" },
                    storeId: { type: "number" },
                    rating: { type: "number" },
                    comment: { type: "string" },
                    createdAt: { type: "string", format: "date-time" }
                  }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "잘못된 요청 파라미터",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "잘못된 요청입니다." }
            }
          }
        }
      }
    }
  */
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};
import express from 'express';
import { findMissionsByStoreId } from '../services/mission.service.js';

const router = express.Router();

// GET /api/v1/stores/:storeId/missions
router.get('/:storeId/missions', async (req, res) => {
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
  try {
    const { storeId } = req.params;
    const missions = await findMissionsByStoreId(storeId);
    res.status(200).json({ missions });
  } catch (error) {
    console.error('미션 목록 조회 오류:', error);
    res.status(500).json({ message: '미션 목록 조회 중 오류 발생' });
  }
});

export default router;

export const handleStoreCreate = async (req, res, next) => {
  try {
    const dto = bodyToStoreCreateDto(req.body);
     /*
      #swagger.summary = '스토어 생성 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                address: { type: "string" },
                description: { type: "string" },
                phoneNumber: { type: "string" },
                categoryId: { type: "number" }
              }
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: "스토어 생성 성공 응답",
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
                    id: { type: "number" },
                    name: { type: "string" },
                    address: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
      #swagger.responses[400] = {
        description: "스토어 생성 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "S001" },
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

    // 필수 값 유효성 검사
    if (!dto.name || !dto.address || dto.description == null) {
      throw new StoreCreateError("name, address, description은 필수입니다.");
    }
    const store = await storeCreate(dto);
    return res.status(StatusCodes.OK).success(store);
  } catch (error) {
    next(error);
  }
};