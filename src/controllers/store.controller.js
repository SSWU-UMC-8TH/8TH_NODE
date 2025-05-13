import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service.js";

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};
import express from 'express';
import { findMissionsByStoreId } from '../services/mission.service.js';

const router = express.Router();

// GET /api/v1/stores/:storeId/missions
router.get('/:storeId/missions', async (req, res) => {
  try {
    const { storeId } = req.params;
    const missions = await findMissionsByStoreId(storeId);
    res.status(200).json({ missions });
  } catch (error) {
    console.error('미션 목록 조회 오류:', error);
    res.status(500).json({ message: '미션 목록 조회 중 오류 발생' });
  }
});

export default router;