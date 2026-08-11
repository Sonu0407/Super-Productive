import jwt from "jsonwebtoken";

export const newRefreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    const newAccessToken = generateAcsessToken(user);
    res.json({ accessToken: newAccessToken });
  });
};
