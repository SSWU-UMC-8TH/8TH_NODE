import { pool } from "../db.config.js";

// 가게 존재 여부 확인
export const checkStoreExist = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT id FROM store WHERE id = ?;", [storeId]);
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

// 사용자 존재 여부 확인
export const checkUserExist = async (userId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT id FROM user WHERE id = ?;", [userId]);
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

// 리뷰 추가
export const addReview = async ({ user_id, store_id, body, score }) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO review (user_id, store_id, body, score, created_at) VALUES (?, ?, ?, ?, NOW());",
      [user_id, store_id, body, score]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};
