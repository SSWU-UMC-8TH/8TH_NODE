import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/challenges.dto.js";
import { createMissionChallenge } from "../services/challenges.service.js";
import { getUserChallenges } from "../services/challenges.service.js";
import { completeUserMission } from "../services/challenges.service.js";

export const handleAddChallenge = async (req, res, next) => {
    /*
    #swagger.summary = '도전중인 미션 추가하기';
    #swagger.requestBody = {
      required:true,
      content:{
        "application/json":{
          schema : {
            type:"object",
            properties:{
                userId:{type:"number", example:2},
                missionId:{type:"number", example:3},
                status:{type:"string", example:"IN_PROGRESS"}
            }
          }
        }
      }
    }
    #swagger.responses[200]={
      description:"도전중인 미션 추가하기 성공 응답",
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
                  id:{type:"number", example:1},
                  userId:{type:"number", example:1},
                  missionId:{type:"number",example:1},
                  status:{type:"string", example:"IN_PROGRESS"}
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description:"도전중인 미션 추가하기 실패 응답",
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
        const missionId = parseInt(req.params.missionId);
        const challengeData = bodyToChallenge(req.body, missionId);

        const result = await createMissionChallenge(challengeData.userId, { missionId: challengeData.missionId });

        res.status(StatusCodes.CREATED).success(result);
    } catch(err){
        next(err);
    }
};

export const handleUserChallengeList = async(req, res, next) =>{
    /*
    #swagger.summary = "사용자가 도전중인 미션 보여주기",
    #swagger.responses[200] = {
        description:"사용자가 도전중인 미션 보여주기 성공 응답",
        content:{
            "application/json":{
                schema: {
                    type:"object", 
                    properties:{
                        resultType:{type:"string", nullable:true, example:"SUCCESS"},
                        error: {type:"object", nullable: true, example:null},
                        success: {
                            type:"object", 
                            properties: {
                                data: {
                                    type:"array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        id:{type:"number", example:2},
                                        userId:{type:"number", example:2},
                                        missionId:{type:"number", example:3},
                                        status: {type:"string", example:"IN_PROGRESS"},
                                        mission: {
                                            type:"object",
                                            properties:{
                                                id:{type:"number", example:3},
                                                reward:{type:"number", example:500},
                                                deadline:{type:"string", format:"date-time", example:"2025-05-24T00:00:00.000Z"},
                                                missionSpec: {type:"string", example:"단팥빵 포장하기"},
                                                store: {
                                                    type:"object",
                                                    properties:{
                                                        id:{type:"number", example:2},
                                                        name:{type:"string", example:"홍팥집"},
                                                        address: {type:"string", example:"강남구 남부순환로359길 31 1층"}
                                                    }
                                                }
                                            }
                                        }
                                      }    
                                    } 
                                  }
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
        description :"사용자가 도전중인 미션 보여주기 실패 응답",
        content: {
            "application/json" : {
                schema : {
                    type:"object", 
                    properties: {
                        resultType: {type:"string", example:"FAIL"},
                        error :{
                            type:"object",
                            properties: {
                                errorCode:{type:"string", example:"U001"},
                                reason : {type:"string"},
                                data:{type:"object"}
                            }
                        },
                        success: {
                            type:"object", 
                            nullable:true, 
                            example:null
                        }
                    }
                }   
            }
        }
    };
    */
    try{
        const userId = parseInt(req.params.userId);
        const challenges = await getUserChallenges(userId); // 서비스 호출

        res.status(200).success(challenges);
    } catch(error){
        next(error);
    }
}

export const handleCompleteChallenge = async(req, res, next) =>{
    /*
    #swagger.summary = '도전중인 미션 완료로 변경하기';
    #swagger.requestBody = {
      required:true,
      content:{
        "application/json":{
          schema : {
            type:"object",
            properties:{
                userId:{type:"number", example:2},
            }
          }
        }
      }
    }
    #swagger.responses[200]={
      description:"도전중인 미션 완료로 변경하기 성공 응답",
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
                  message:{type:"string", example:"미션 완료 처리 성공"},
                  result:{
                    type:"object",
                    properties:{
                        count:{type:"number", example:1}
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
      description:"도전중인 미션 완료로 변경하기 실패 응답",
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
    try{
        const missionId = parseInt(req.params.missionId);
        const {userId} = req.body;

        const result = await completeUserMission({userId, missionId});

        res.status(200).success({message:"미션 완료 처리 성공", result});
    } catch(error) {
        next(error);
    }
};