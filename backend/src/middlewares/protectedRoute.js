import jwt from "jsonwebtoken";

const protectedRoute = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  const token = req.cookies.accessToken;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in protectedRoute:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default protectedRoute;
