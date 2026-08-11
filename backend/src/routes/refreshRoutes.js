import express from "express";
import { newRefreshToken } from "../controllers/refresh.controller.js";

const router = express.Router();

router.post("/", newRefreshToken);

export default router;
