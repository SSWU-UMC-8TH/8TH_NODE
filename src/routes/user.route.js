import express from "express";
import { updateMyInfo } from "../controllers/user.controller.js";

const router = express.Router();

router.patch("/me", updateMyInfo);

export default router;
