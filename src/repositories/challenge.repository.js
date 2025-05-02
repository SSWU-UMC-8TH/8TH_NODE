import { pool } from "../db.config.js";

// 미션 존재 확인
export const checkMissionExists = async (missionId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT id FROM mission WHERE id = ?`, [missionId]);
        return rows.length > 0;
    } finally {
        conn.release();
    }
};

// 도전 중인지 확인
export const checkDuplicateChallenge = async (userId, missionId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT id FROM user_mission WHERE user_id = ? AND mission_id = ?`,
            [userId, missionId]
        );
        return rows.length > 0;
    } finally {
        conn.release();
    }
};

// 도전 추가
export const addChallenge = async (userId, missionId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO user_mission (user_id, mission_id, status, created_at, updated_at)
       VALUES (?, ?, 'in_progress', NOW(), NOW())`,
            [userId, missionId]
        );
        return result.insertId;
    } finally {
        conn.release();
    }
};