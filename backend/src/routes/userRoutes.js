import Router from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import protectedRoute from "../middlewares/protectedRoute.js";
const userRouter = Router();

userRouter.get("/me", protectedRoute, getMe);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
