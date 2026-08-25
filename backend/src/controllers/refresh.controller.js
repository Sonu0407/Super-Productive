import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/generateToken.js";
import db from "../database/db.js";

export const newRefreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    console.log("token:", token);

    if (!token)
      return res.status(401).json({ error: "No Refresh token found" });

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    console.log("decoded:", decoded);

    const query = "SELECT * FROM refresh_token WHERE user_id = $1";
    const value = [decoded.userId];
    const result = await db.query(query, value);

    console.log(result.rows);

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Refresh token not found" });
    }

    const storedToken = result.rows[0];

    const isValid = await bcrypt.compare(token, storedToken.token);

    if (!isValid) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(decoded.userId);

    return res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Error in refreshAccessToken:", error);
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};
