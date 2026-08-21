import jwt from "jsonwebtoken";

const protectedRoute = (req, res, next) => {
  console.log("Authorization header:", req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1];
  console.log("line 5", token);
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
