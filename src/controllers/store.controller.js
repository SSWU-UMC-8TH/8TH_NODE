import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { createStoreService, getStoreMission } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
  /*
    #swagger.summary = '특정 지역에 가게 추가하기';
    #swagger.requestBody = {
      required:true,
      content:{
        "application/json":{
          schema : {
            type:"object",
            properties:{
              name:{type:"string", example:"스타벅스 강남역점"},
              address:{type:"string", example:"강남구 강남대로 123"},
              description:{type:"string", example:"24시간 운영하는 매장"}
            }
          }
        }
      }
    }
    #swagger.responses[200]={
      description:"특정 지역에 가게 추가하기 성공 응답",
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
                  id: { type: "number", example: 8 },
                  name: { type: "string", example: "스타벅스 강남역점" },
                  address: { type: "string", example: "강남구 강남대로 123" },
                  description: { type: "string", example: "24시간 운영하는 매장" },
                  regionId: { type: "number", example: 7 }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description:"가게 추가 실패 응답",
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
  console.log("특정 지역에 가게 추가하기를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  try{
    const regionId = req.params.regionId;
    const storeData = bodyToStore(req.body, regionId);

    const newStore = await createStoreService(storeData);
    res.status(StatusCodes.CREATED).success(newStore);

  } catch(err) {
    next(err);
  }
};

// 특정 가게의 리뷰 목록을 클라이언트에게 응답해주는 API 핸들러 
export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회';
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
                  data:{
                    type:"array", 
                    items: {
                      type:"object",
                      properties:{
                        id:{type:"number", example:1},
                        body:{type:"string", example:"자리가 많고, 조용해서 좋아요~"},
                        store:{
                          type:"object", 
                          properties:{
                            id:{type:"number"},
                            name:{type:"string"},
                            address:{type:"string"},
                            regionId:{type:"number"}
                          }
                        },
                        user:{
                          type:"object",
                          properties:{
                            id:{type:"number"},
                            email:{type:"string"},
                            name:{type:"string"},
                            gender:{type:"string", format:"date-time"},
                            address:{type:"string"},
                            detailAddress:{type:"string"},
                            phoneNumber:{type:"string"}
                          }
                        }
                      }
                    }
                  },
                  pagination:{
                    type:"object",
                    properties:{
                      cursor:{type:"number", nullable:true, example:3}
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description:"상점 리뷰 목록 조회 실패",
      content:{
        "application/json" : {
          schema:{
            type:"object",
            properties:{
              resultType:{type:"string", example:"FAIL"},
              error:{
                type:"object",
                properties:{
                  errorCode: {type:"string", example:"U001"},
                  reason:{type:"string", example:"해당 상점이 존재하지 않습니다."},
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
    console.log("특정 가게의 리뷰 목록을 요청했습니다.");

    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) :0
    );

    res.status(200).success(reviews);

  } catch(error){
    next(error);
  }
};

// 특정 가게의 미션 목록을 클라이언트에게 응답해주는 API 핸들러 
export const handleShowStoreMission = async(req, res, next)=> {
  /*
    #swagger.summary = "특정 가게의 미션 보여주기",
    #swagger.responses[200] = {
        description:"특정 가게의 미션 보여주기 성공 응답",
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
                               data:{
                                type:"object",
                                properties: {
                                  data: {
                                    type:"array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        id: { type: "number", example: 1 },
                                        reward: { type: "number", example: 500 },
                                        deadline: {
                                          type: "string",
                                          format: "date-time",
                                          example: "2025-05-30T00:00:00.000Z"
                                        },
                                        missionSpec: {
                                          type: "string",
                                          example: "스타벅스에서 적립하기"
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
        description :"가게에 리뷰 추가하기 실패 응답",
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
    console.log("특정 가게의 미션 목록을 요청했습니다.");

    const storeId = parseInt(req.params.storeId);
    const missions = await getStoreMission(storeId);

    res.status(200).success({data:missions});

  }catch(error) {
    next(error);
  }
}