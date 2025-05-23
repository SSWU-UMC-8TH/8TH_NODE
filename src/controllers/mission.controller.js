import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMissionService } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
    /*
    #swagger.summary = '특정 가게에 미션 추가하기';
    #swagger.requestBody = {
      required:true,
      content:{
        "application/json":{
          schema : {
            type:"object",
            properties:{
                storeId:{type:"number", example:1},
                reward:{type:"number", example:300},
                deadline:{type:"string", format:"date-time", example:"2025-05-31T00:00:00.000Z"},
                missionSpec:{type:"string", example:"스타벅스에서 자몽허니블랙티 주문하기"}
            }
          }
        }
      }
    }
    #swagger.responses[200]={
      description:"특정 가게에 미션 추가하기 성공 응답",
      content:{
        "application/json" : {
          schema: {
            type:"object",
            properties:{
              resultType: {type:"string", example:"SUCCESS"},
              error: {type:"object", nullable:true, example:null},
              success:{
                type:"object",
                properties: {
                  storeId:{type:"number", example:1},
                  reward:{type:"number", example:300},
                  deadline:{type:"string", format:"date-time", example:"2025-05-31T00:00:00.000Z"},
                  missionSpec:{type:"string", example:"스타벅스에서 자몽허니블랙티 주문하기"}
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description:"특정 가게에 미션 추가하기 실패 응답",
      content: {
        "application/json" : {
          schema:{
            type:"object",
            properties: {
              resultType: {type:"string", example:"FAIL"},
              error: {
                type:"object",
                properties:{
                  errorCode:{type:"string", example:"U001"},
                  reason:{type:"string", example:"이미 등록된 상점입니다."},
                  data: {type:"object", example:{}}
                }
              },
              success:{
                type:"object", nullable:true, example:null
              }
            }
          }
        }
      }
    }
  */
    try {
        const storeId = parseInt(req.params.storeId);
        const missionData = bodyToMission(req.body, storeId);

        const result = await createMissionService(storeId, missionData);

        res.status(StatusCodes.CREATED).success(result);
    } catch(err){
        next(err);
    }
};