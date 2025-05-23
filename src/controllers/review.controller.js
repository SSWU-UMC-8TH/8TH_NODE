import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReviewService } from "../services/review.service.js";
import { showMyReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
    /*
    #swagger.summary = "가게에 리뷰 추가하기 요청",
    #swagger.requestBody = {
        required:true,
        content:{
            "application/json": {
                schema : {
                    type:"object",
                    properties: {
                        userId:{type:"number", example:1},
                        review:{type:"string", example:"자몽허니블랙티 너무 맛있어요~"},
                        score:{type:"number", example:5},
                        storeId:{type:"number",example:2}
                    }
                }
            }
        }
    };
    #swagger.responses[200] = {
        description:"가게에 리뷰 추가하기 성공 응답",
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
                                userId:{type:"number"},
                                review:{type:"string"},
                                score:{type:"number"},
                                storeId:{type:"number"}
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
    try {
        const storeId = parseInt(req.params.storeId);
        const reviewData = bodyToReview(req.body, storeId);

        const result = await createReviewService(storeId, reviewData);

        res.status(StatusCodes.CREATED).success(result);
    } catch(err){
        next(err);
    }
};

export const handleShowMyReview = async (req, res, next) => {
    /*
    #swagger.summary = "사용자가 작성한 리뷰 보여주기",
    #swagger.responses[200] = {
        description: "사용자가 작성한 리뷰 보여주기 성공 응답",
        content:{
            "application/json" :{
                schema: {
                    type:"object", 
                    properties: {
                        resultType:{type:"string", example:"SUCCESS"},
                        error:{type:"string", nullable:true, example:null},
                        success: {
                            type:"object",
                            properties:{
                                data:{
                                    type:"array", 
                                    items: {
                                        type:"object", 
                                        properties: {
                                            id: {type:"number", example:1},
                                            review:{type:"string", example:"자리가 많고 조용해서 좋아요~"},
                                            score:{type:"string"},
                                            storeName:{type:"string", example:"스타벅스 강남역점"},
                                            storeAddress: {type:"string", example:"강남구 강남대로 123"}
                                        }
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
        description : "시용자가 작성한 리뷰 보여주기 실패 응답",
        content : {
            "application/json": {
                schema: {
                    type:"object", 
                    properties:{
                        resultType:{type:"string", example:"FAIL"},
                        error: {
                            type:"object",
                            properties: {
                                errorCode: {type:"string", example:"U001"},
                                reason :{type:"string", example:"사용자가 존재하지 않습니다."},
                                data: { type:"object", example:{}}
                            }
                        },
                        success: {type:"object", nullable:true, example:null}
                    }
                }
            }
        }
    }
    */
    try{
        const userId = parseInt(req.params.userId);
        const reviews = await showMyReview(userId);

        res.status(StatusCodes.OK).success({data: reviews});
    } catch(error){
        next(error);
    }
};