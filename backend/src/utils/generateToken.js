import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return token;
};

export const generateRefreshToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_SECRET, {
    expiresIn: "5d",
  });
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return token;
};
