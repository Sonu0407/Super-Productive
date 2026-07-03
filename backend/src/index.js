import express from "express";
import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import TimerRouter from "./routes/timerRoutes.js";
import db from "./database/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/setTimer", TimerRouter);

db.connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
