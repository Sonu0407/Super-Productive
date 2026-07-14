import Navbar from "../components/Navbar";
import FocusTimer from "../components/FocusTimer";
import TaskPanel from "../components/TaskPanel";
import { useEffect, useState } from "react";
import MusicCard from "../components/MusicCard";

const Home = () => {
  const [getAllTask, setGetAllTask] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  console.log(selectedSong);

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
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f0f0f] position: relative">
      <div className="max-w-[1440px] mx-auto px-4 py-4">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-3">
          <div>
            <FocusTimer
              selectedSong={selectedSong}
              setSelectedSong={setSelectedSong}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />
          </div>

          <div>
            <TaskPanel />
          </div>
        </div>
      </div>

      {/* Sounds Content */}

      <MusicCard setSelectedSong={setSelectedSong} />
    </div>
  );
};

export default Home;
