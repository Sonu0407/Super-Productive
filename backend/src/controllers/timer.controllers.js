import db from "../database/db.js";

export const setTimer = async (req, res) => {
  try {
    const { focus_minutes } = req.body;
    const reward = Math.floor(focus_minutes / 60);
    const userId = req.userId;
    let taskId = 0;

    if (!focus_minutes) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
      const query =
        "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC LIMIT 1";
      const values = [userId];
      const result = await db.query(query, values);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Task not found" });
      } else {
        taskId = result.rows[0].id;
      }
    } catch (error) {
      console.error("Database error in setTimer:", error);
      res.status(500).json({ message: "Internal server error" });
    }

    try {
      const query =
        "INSERT INTO focus_sessions (task_id, focus_minutes, reward) VALUES ($1, $2, $3)";
      const values = [taskId, focus_minutes, reward];
      const result = await db.query(query, values);
      const timer = result.rows[0];
      res.status(200).json({ message: "Timer set successfully", timer });
    } catch (error) {
      console.error("Database error in setTimer:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in setTimer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
