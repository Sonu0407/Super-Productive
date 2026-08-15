import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import { setTimer } from "../controllers/timer.controllers.js";

const router = Router();

router.post("/", protectedRoute, setTimer);

export default router;
