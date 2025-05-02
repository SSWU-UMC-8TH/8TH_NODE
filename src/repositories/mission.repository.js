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

// 미션 등록
export const addMission = async (storeId, data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO mission (store_id, reward, deadline, mission_spec, created_at, updated_at)
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [storeId, data.reward, data.deadline, data.missionSpec]
        );
        return result.insertId;
    } finally {
        conn.release();
    }
};
