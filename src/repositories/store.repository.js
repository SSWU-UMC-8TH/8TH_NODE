import { pool } from "../db.config.js";

// 해당 region이 존재하는지 확인
export const checkRegionExists = async (regionId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT id FROM region WHERE id = ?`,
            [regionId]
        );
        return rows.length > 0;
    } finally {
        conn.release();
    }
};

// store 등록
export const addStore = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO store (region_id, name, address, created_at, updated_at)
       VALUES (?, ?, ?, NOW(), NOW());`,
            [data.regionId, data.name, data.address]
        );
        return result.insertId;
    } finally {
        conn.release();
    }
};
