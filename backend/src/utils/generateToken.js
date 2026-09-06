import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, res) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });

  if (res) {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, //15 minutes
    });
  }
  return accessToken;
};

export const generateRefreshToken = (userId, res) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, {
    expiresIn: "5d",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });
  return refreshToken;
};
