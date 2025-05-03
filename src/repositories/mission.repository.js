import { pool } from "../db.config.js";

export const getStoreById = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query("SELECT * FROM store WHERE id = ?", [storeId]);
    return result[0];
  } finally {
    conn.release();
  }
};

export const addMission = async (missionData) => {
    try {
      const conn = await pool.getConnection();
      const query = `
        INSERT INTO mission (store_id, reward, deadline, mission_spec, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW());
      `;
      const [result] = await conn.query(query, [
        missionData.storeId,
        missionData.reward,
        missionData.deadline,
        missionData.missionSpec,
      ]);
      conn.release();
  
      return {
        id: result.insertId,
        ...missionData,
      };
    } catch (error) {
      throw new Error('미션 추가 중 오류 발생: ' + error);
    }
  };