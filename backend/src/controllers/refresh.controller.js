import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateToken.js";

export const newRefreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return res.status(401).json({ error: "No Refresh token found" });

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    generateAccessToken(decoded.userId, res);

    return res.status(200).json({
      message: "Access token refreshed successfully",
    });
  } catch (error) {
    console.error("Error in refreshAccessToken:", error);
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};
