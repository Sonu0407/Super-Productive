import Router from "express";
import {
  getMe,
  getWalletBalance,
  loginUser,
  logoutUser,
  registerUser,
  updateUserWallet,
  updateUserWalletDecrease,
} from "../controllers/user.controllers.js";
import protectedRoute from "../middlewares/protectedRoute.js";
const userRouter = Router();

userRouter.get("/me", protectedRoute, getMe);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/wallet", protectedRoute, getWalletBalance);
userRouter.post("/update/wallet", protectedRoute, updateUserWallet);
userRouter.post(
  "/update/wallet/decrease",
  protectedRoute,
  updateUserWalletDecrease,
);

export default userRouter;
