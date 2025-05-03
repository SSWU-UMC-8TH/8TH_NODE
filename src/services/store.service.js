import { addStore } from "../repositories/store.repository.js";

export const createStore = async (data) => {
  const storeId = await addStore(data);
  return { id: storeId, ...data };
};
