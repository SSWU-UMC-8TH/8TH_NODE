// 새로운 리뷰를 DB에 INSERT하고, 삽입된 리뷰의 정보를 객체로 반환하는 저장소 역할 

import { pool } from "../db.config.js";

// reviewData를 받아서, 리뷰를 등록하는 함수 
export const addReview = async ({userId, review, score, storeId}) => {
    const conn = await pool.getConnection(); // DB 연결 

    try{
        const [result] = await conn.query(
            `INSERT INTO review (user_id, store_id, body, score) VALUES(?,?,?,?)`,
            [userId, storeId, review, score]
        );

        return {
            id: result.insertId,
            userId,
            storeId,
            review,
            score,
        };
    } finally {
        conn.release();
    }
};