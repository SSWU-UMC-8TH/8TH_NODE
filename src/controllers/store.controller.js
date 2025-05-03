import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { createStoreService } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
  console.log("특정 지역에 가게 추가하기를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  try{
    const regionId = req.params.regionId;
    const storeData = bodyToStore(req.body, regionId);

    const newStore = await createStoreService(storeData);
    res.status(StatusCodes.CREATED).json({result:newStore});

  } catch(err) {
    next(err);
  }
};