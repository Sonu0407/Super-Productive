import Navbar from "../components/Navbar";
import FocusTimer from "../components/FocusTimer";
import TaskPanel from "../components/TaskPanel";
import { useEffect, useState } from "react";

const Home = () => {
  const [getAllTask, setGetAllTask] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  // add music folder and commit changes

  const getAllTasks = async () => {
    try {
      const url = "http://localhost:8000/api/tasks/";
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      // console.log("response", response);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      setGetAllTask(data.tasks);
      // console.log(getAllTask);
      console.log(Array.isArray(data));
      console.log(data.tasks);
    } catch (error) {
      console.log("Error in getAllTasks:", error);
    }
  };
  // create custom hook for rewards
  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f0f0f]">
      <div className="max-w-[1440px] mx-auto px-4 py-4">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-3">
          <div>
            <FocusTimer />
          </div>

          <div>
            <TaskPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
