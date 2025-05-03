import { pool } from "../db.config.js";

export const addStore = async ({ regionId, name, address, score }) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO store (region_id, name, address, score) VALUES (?, ?, ?, ?);`,
      [regionId, name, address, score]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`가게 등록 중 오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};
