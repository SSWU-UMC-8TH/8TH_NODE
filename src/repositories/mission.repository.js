import { pool } from "../db.config.js";

export const addMission = async ({reward, missionSpec, storeId, deadline}) => {
    const conn = await pool.getConnection(); // DB 연결 

    try{
        const [result] = await conn.query(
            `INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES(?,?,?,?)`,
            [storeId, reward, deadline, missionSpec]
        );

        return {
            id: result.insertId,
            storeId,
            reward,
            deadline,
            missionSpec
        };
    } finally {
        conn.release();
    }
};