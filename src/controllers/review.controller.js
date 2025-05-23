import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReviewService } from "../services/review.service.js";
import { showMyReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
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
    */
    try{
        const userId = parseInt(req.params.userId);
        const reviews = await showMyReview(userId);

        res.status(StatusCodes.OK).success({data: reviews});
    } catch(error){
        next(error);
    }
};