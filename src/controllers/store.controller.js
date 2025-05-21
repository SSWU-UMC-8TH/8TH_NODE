import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";

// 새로운 가게(store)를 등록하는 핸들러
export const handleCreateStore = async (req, res) => {
    try {
        const storeData = bodyToStore(req.body);
        const storeId = await createStore(storeData);
        res.status(StatusCodes.CREATED).json({ id: storeId });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};
