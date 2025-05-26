import {getUserReviewsService, reviewCreate} from '../services/review.service.js';
import { responseListFromUserReviews, ReviewCreateDto } from '../dtos/review.dto.js';

export const getUserReviewsController = async (req, res) => {
  /*
    #swagger.summary = '사용자 리뷰 목록 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              reviews: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
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
      description: "잘못된 사용자 ID",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "유효한 사용자 ID가 아닙니다." }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: "리뷰 조회 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "리뷰 조회 중 오류 발생" },
              error: { type: "string" }
            }
          }
        }
      }
    }
  */
  const userId = Number(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "유효한 사용자 ID가 아닙니다." });
  }

  try {
    const reviews = await getUserReviewsService(userId);
    const response = responseListFromUserReviews(reviews);
    res.status(200).json({ reviews: response });
  } catch (error) {
    res.status(500).json({ message: "리뷰 조회 중 오류 발생", error: error.message });
  }
};

export async function createReview(req, res, next) {
  /*
    #swagger.summary = '리뷰 생성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "number" },
              storeId: { type: "number" },
              rating: { type: "number", format: "float" },
              comment: { type: "string" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "리뷰 생성 성공 응답",
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
                  userId: { type: "number" },
                  storeId: { type: "number" },
                  rating: { type: "number" },
                  comment: { type: "string" }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "리뷰 생성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
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
  try {
    const dto = new ReviewCreateDto(req.body);
    const review = await reviewCreate(dto);
    return res.status(200).success(review);
  } catch (error) {
    next(error);
  }
}