import Router from "express";

import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from "../controllers/task.controllers.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const taskRouter = Router();

taskRouter.get("/", protectedRoute, getAllTasks);
taskRouter.get("/:id", protectedRoute, getTaskById);
taskRouter.post("/", protectedRoute, createTask);
taskRouter.put("/:id", protectedRoute, updateTask);
taskRouter.delete("/:id", protectedRoute, deleteTask);

export default taskRouter;
