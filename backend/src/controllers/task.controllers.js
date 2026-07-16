import db from "../database/db.js";

export const getAllTasks = async (req, res) => {
  try {
    const userId = req.userId;

    try {
      const query = "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC";
      const values = [userId];
      const result = await db.query(query, values);
      res.status(200).json({ tasks: result.rows });
    } catch (error) {
      console.error("Database error in getAllTasks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in getAllTasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const userId = req.userId;
    const { id: taskId } = req.params;

    try {
      const query = "SELECT * FROM tasks WHERE id = $1 AND user_id = $2";
      const values = [taskId, userId];
      const result = await db.query(query, values);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({ task: result.rows[0] });
    } catch (error) {
      console.error("Database error in getTaskById:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in getTaskById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, completed, rewards, focus_session } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
      const query =
        "INSERT INTO tasks (user_id, title, description, completed, rewards, focus_session) VALUES ($1, $2, $3, $4, $5, $6)";
      const values = [
        userId,
        title,
        description,
        completed,
        rewards,
        focus_session,
      ];
      const result = await db.query(query, values);

      res
        .status(201)
        .json({ message: "Task created successfully", task: result.rows[0] });
    } catch (error) {
      console.error("Database error in createTask:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in createTask:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { id: taskId } = req.params;
    const { title, description, completed, rewards, focus_session } = req.body;
    const focus_seconds = focus_session * 60;

    // if (focus_session) {
    //   const timeToFocus = () => {
    //     return new Promise((resolve) => {
    //       setTimeout(() => {
    //         const reward = (focus_session / 60).toFixed(2);
    //         resolve(reward);
    //       }, focus_seconds * 1000); // convert seconds to milliseconds
    //     });
    //   };

    //   const reward = await timeToFocus();

    //   console.log(reward);

    //   const query =
    //     "UPDATE tasks SET rewards = $1 WHERE id = $2 AND user_id = $3 RETURNING *";
    //   const values = [reward, taskId, userId];
    //   const result = await db.query(query, values);
    //   console.log(result.rows[0]);
    //   return res.status(200).json({
    //     message: "Task updated successfully1",
    //     task: result.rows[0],
    //   });
    //   console.log("Come Here!");
    // } else {
    //   console.log(title);
    //   console.log(description);

    if (!title) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
      const query =
        "UPDATE tasks SET title = $1, description = $2, completed = $3, rewards = $4, focus_session = $5 WHERE id = $6 AND user_id = $7";
      const values = [
        title,
        description,
        completed,
        rewards,
        focus_session,
        taskId,
        userId,
      ];
      const result = await db.query(query, values);

      if (result.rowCount === 0) {
        res.status(404).json({ message: "Task not found" });
      } else {
        res.status(200).json({ message: "Task updated successfully2" });
      }
    } catch (error) {
      console.error("Database error in updateTask:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in updateTask:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { id: taskId } = req.params;

    try {
      const query = "DELETE FROM tasks WHERE id = $1 AND user_id = $2";
      const values = [taskId, userId];
      const result = await db.query(query, values);

      if (result.rowCount === 0) {
        res.status(404).json({ message: "Task not found" });
      } else {
        res.status(200).json({ message: "Task deleted successfully" });
      }
    } catch (error) {
      console.error("Database error in deleteTask:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in deleteTask:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
