import db from "../database/db.js";
import bcrypt from "bcryptjs";

export const uploadRefreshTokenToDatabase = async (userId, refreshToken) => {
  try {
    const saltRounds = 10;
    const hashedToken = await bcrypt.hash(refreshToken, saltRounds);
    const expiresIn = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const query =
      "INSERT INTO refresh_token (user_id, token, expires_at) VALUES ($1, $2, $3)";
    const values = [userId, hashedToken, expiresIn];
    const response = await db.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error in uploadRefreshTokenToDatabase", error);
  }
};
