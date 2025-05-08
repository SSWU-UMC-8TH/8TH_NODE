import { pool } from "../db.config.js";

export const addChallenge = async ({userId, missionId}) => {
    const conn = await pool.getConnection(); // DB 연결 

    try{
        const [result] = await conn.query(
            `INSERT INTO user_mission (user_id, mission_id, status) VALUES(?,?,?)`,
            [userId, missionId, 'IN_PROGRESS']
        );

        return {
            id: result.insertId,
            userId,
            missionId,
            status:"IN_PROGRESS"
        };
    } finally {
        conn.release();
    }
};

export const isAlreadyChallenged = async (userId, missionId) => {
    const conn = await pool.getConnection();
    try{
        const [rows] = await conn.query(
            `SELECT EXISTS (SELECT 1 FROM user_mission WHERE user_id=? AND mission_id =?) AS isExist`,
            [userId, missionId]
        );
        return rows[0].isExist ===1;
    } finally{
        conn.release();
    }
}

export const isMissionExist = async (missionId) => {
    const conn = await pool.getConnection();

    try{
        const [rows] = await conn.query (
            `SELECT EXISTS (SELECT 1 FROM mission WHERE id=?) AS isExist`, [missionId]
        );
        return rows[0].isExist ===1;
    } finally {
        conn.release();
    }
}