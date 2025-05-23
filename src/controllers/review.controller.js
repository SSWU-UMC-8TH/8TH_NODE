import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview, listStoreReviews, listUserReviews } from "../services/review.service.js";
import { InvalidUserIdFormatError } from "../errors.js";

// 특정 가게에 대한 리뷰를 작성하는 핸들러
export const handleCreateReview = async (req, res) => {
  try {
    const storeId = parseInt(req.params.storeId);
    const reviewData = bodyToReview(req.body);
    const id = await createReview(storeId, reviewData);
    res.status(StatusCodes.CREATED).json({ id });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// 특정 가게에 등록된 리뷰 목록을 조회하는 핸들러
export const handleListStoreReviews = async (req, res, next) => {
  /*
#swagger.summary = '상점 리뷰 목록 조회 API';
#swagger.responses[200] = {
  description: "상점 리뷰 목록 조회 성공 응답",
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
                    store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                    user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                    content: { type: "string" }
                  }
                }
              },
              pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
            }
          }
        }
      }
    }
  }
};
*/
  const storeId = parseInt(req.params.storeId);
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  const reviews = await listStoreReviews(storeId, cursor);
  res.status(StatusCodes.OK).success(reviews);
};

// 특정 사용자가 작성한 리뷰 목록을 조회하는 핸들러
export const handleListUserReviews = async (req, res, next) => {
  /*
#swagger.summary = '사용자가 작성한 리뷰 목록 API';
#swagger.responses[200] = {
  description: "사용자 리뷰 목록 조회 성공 응답",
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
                    content: { type: "string"},
                    score: { type: "number"},
                    store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                  }
                }
              },
              pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
            }
          }
        }
      }
    }
  }
};
#swagger.responses[404] = {
      description: "존재하지 않는 사용자의 리뷰 조회 실패 응답",
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
      description: "유효하지 않는 userID의 리뷰 조회 실패 응답",
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
    // 유효성 확인
    if (isNaN(userId)) {
      throw new InvalidUserIdFormatError();
    }
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

    const reviews = await listUserReviews(userId, cursor);
    res.status(StatusCodes.OK).success(reviews);
  } catch (err) {
    next(err);
  }
};