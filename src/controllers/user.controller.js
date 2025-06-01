import { StatusCodes } from "http-status-codes";
import { prisma } from "../db.config.js";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

// 회원가입을 하는 핸들러
export const handleUserSignUp = async (req, res, next) => {
  /*
  #swagger.summary = '회원 가입 API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: { type: "string" },
            name: { type: "string" },
            gender: { type: "string" },
            birth: { type: "string", format: "date" },
            address: { type: "string" },
            detailAddress: { type: "string" },
            phoneNumber: { type: "string" },
            preferences: { type: "array", items: { type: "number" } }
          }
        }
      }
    }
  };
  #swagger.responses[200] = {
    description: "회원 가입 성공 응답",
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
                email: { type: "string" },
                name: { type: "string" },
                preferCategory: { type: "array", items: { type: "string" } }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "회원 가입 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U001" },
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
  res.status(StatusCodes.OK).success(user);
};

// 사용자 정보 수정 핸들러
export const handleUpdateMyInfo = async (req, res, next) => {
  /*
  #swagger.summary = '사용자 정보 수정 API'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            phoneNumber: { type: "string", example: "010-1234-5678" },
            birth: { type: "string", format: "date", example: "1936-04-28" },
            address: { type: "string", example: "서울시 성북구" },
            detailAddress: { type: "string", example: "보문로34다길 2, 성신여대" },
            gender: { type: "string", example: "여자" }
          }
        }
      }
    }
  };
  #swagger.responses[200] = {
    description: "사용자 정보 수정 성공 응답",
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
                email: { type: "string" },
                name: { type: "string" },
                phoneNumber: { type: "string" },
                birth: { type: "string", format: "date" },
                address: { type: "string" },
                detailAddress: { type: "string" }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "사용자 정보 수정 실패 응답",
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
  */
  try {
    const userId = req.user.id;

    const { phoneNumber, birth, address, detailAddress, gender } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        phoneNumber,
        birth: new Date(birth),
        address,
        detailAddress,
        gender,
      },
    });

    res.status(StatusCodes.OK).success(updatedUser);
  } catch (err) {
    next(err);
  }
};