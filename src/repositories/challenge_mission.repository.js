import { pool } from "../db.config.js";

export async function isAlreadyChallenging(userId, missionId) {
  const [rows] = await pool.query(
    `SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ?`,
    [userId, missionId]
  );
  return rows.length > 0;
}

export async function addChallengeMission({ userId, missionId }) {
  const [result] = await pool.query(
    `INSERT INTO user_mission (user_id, mission_id) VALUES (?, ?)`,
    [userId, missionId]
  );
  return {
    id: result.insertId,
    userId,
    missionId
  };
}
