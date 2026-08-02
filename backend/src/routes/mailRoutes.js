import express from "express";
import { sendMail } from "../controllers/mail.controller.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const router = express.Router();

router.post("/", protectedRoute, sendMail);

export default router;
