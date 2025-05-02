import { pool } from "../db.config.js";

// 가게 존재 여부 확인
export const checkStoreExists = async (storeId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT id FROM store WHERE id = ?`, [storeId]);
        return rows.length > 0;
    } finally {
        conn.release();
    }
};

// 리뷰 등록
export const addReview = async (storeId, data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO review (user_id, store_id, body, score, created_at) VALUES (?, ?, ?, ?, NOW())`,
            [data.userId, storeId, data.body, data.score]
        );
        return result.insertId;
    } finally {
        conn.release();
    }
};