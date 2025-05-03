import { StatusCodes } from "http-status-codes";
import { createStore } from "../services/store.service.js";
import { bodyToStore } from "../dtos/store.dto.js";

export const handleStoreCreate = async (req, res, next) => {
  try {
    const store = await createStore(bodyToStore(req.body));
    res.status(StatusCodes.CREATED).json({ result: store });
  } catch (err) {
    next(err); 
  }
};
