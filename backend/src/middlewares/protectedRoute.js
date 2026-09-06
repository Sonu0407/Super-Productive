import jwt from "jsonwebtoken";

const protectedRoute = (req, res, next) => {
  // console.log("Headers:", req.headers);
  // console.log("Authorization header:", req.headers.authorization);
  // const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  // const token = req.headers.authorization?.split(" ")[1];
  // console.log("line 5", token);
  const token =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
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
