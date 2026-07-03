import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import { setTimer } from "../controllers/timer.controllers.js";

const TimerRouter = Router();

TimerRouter.post("/", protectedRoute, setTimer);

export default TimerRouter;
