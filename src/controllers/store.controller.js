import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { createStoreService, getStoreMission } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
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
  try{
    console.log("특정 가게의 리뷰 목록을 요청했습니다.");

    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) :0
    );

    res.status(200).json({data:reviews});

  } catch(error){
    next(error);
  }
};

// 특정 가게의 미션 목록을 클라이언트에게 응답해주는 API 핸들러 
export const handleShowStoreMission = async(req, res, next)=> {
  try{
    console.log("특정 가게의 미션 목록을 요청했습니다.");

    const storeId = parseInt(req.params.storeId);
    const missions = await getStoreMission(storeId);

    res.status(200).success({data:missions});

  }catch(error) {
    next(error);
  }
}