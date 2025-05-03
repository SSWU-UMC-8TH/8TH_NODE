// 새로운 가게를 DB에 INSERT하고, 삽입된 가게의 정보를 객체로 반환하는 저장소 역할 

import { pool } from "../db.config.js";

// storeData를 받아서, 가게를 등록하는 함수 
export const addStore = async ({name, address, regionId}) => {
    const conn = await pool.getConnection(); // DB 연결 

    try{
        const [result] = await conn.query(
            `INSERT INTO store (region_id, name, address) VALUES(?,?,?)`,
            [regionId, name, address]
        );

        return {
            id: result.insertId,
            name,
            address,
            regionId,
        };
    } finally {
        conn.release();
    }
};