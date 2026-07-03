import jwt from "jsonwebtoken";

const protectedRoute = (req, res, next) => {
  const token = req.cookies.jwt; // to access the cookie you need to install cookie-parser
  //   console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in protectedRoute:", error);
    res.status(401).json({ message: "Unauthorized" });
  }

  //   console.log(req.userId);
  return req.userId;
};

export default protectedRoute;
