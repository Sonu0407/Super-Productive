import express from "express";
import { newRefreshAccessToken } from "../controllers/refresh.controller.js";

const router = express.Router();

router.post("/", newRefreshAccessToken);

export default router;
