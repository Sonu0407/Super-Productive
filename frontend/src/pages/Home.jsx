import Navbar from "../components/Navbar";
import FocusTimer from "../components/FocusTimer";
import TaskPanel from "../components/TaskPanel";
import { useEffect, useState } from "react";
import MusicCard from "../components/MusicCard";

const Home = () => {
  const [getAllTask, setGetAllTask] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [volume, setVolume] = useState(30);
  const [walletBalance, setWalletBalance] = useState(null);
  const [taskDeleted, setTaskDeleted] = useState(false);

  // Task panel's
  const [completedTasks, setCompletedTasks] = useState(0); // 2
  const [totalReward, setTotalReward] = useState(() => {
    const storedValue = localStorage.getItem("todayEarnings");
    return storedValue !== null ? Number(storedValue) : 0;
  });

  console.log(new Date().getDate());

  useEffect(() => {
    localStorage.setItem("todayEarnings", totalReward);
  }, [totalReward]);

  console.log(volume);

  console.log(selectedSong);

  useEffect(() => {
    getWalletBalance();
  }, []);

  const getWalletBalance = async () => {
    try {
      const url = "http://localhost:8000/api/auth/wallet";
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      setWalletBalance(data.wallet_balance);
    } catch (error) {
      console.error("Error in getWalletBalance:", error);
    }
  };

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
  console.log("Wallet Balance:", walletBalance);

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f0f0f] position: relative">
      <div className="max-w-[1440px] mx-auto px-4 py-4">
        {/* Navbar */}
        <Navbar walletBalance={walletBalance} />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-3">
          <div>
            <FocusTimer
              selectedSong={selectedSong}
              setSelectedSong={setSelectedSong}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              volume={volume}
              setVolume={setVolume}
              reloadwalletBalance={getWalletBalance}
              setCompletedTasks={setCompletedTasks}
              setTotalReward={setTotalReward}
              setTaskDeleted={setTaskDeleted}
            />
          </div>

          <div>
            <TaskPanel
              completedTasks={completedTasks}
              setCompletedTasks={setCompletedTasks}
              totalReward={totalReward}
              setTotalReward={setTotalReward}
              taskDeleted={taskDeleted}
              setTaskDeleted={setTaskDeleted}
            />
          </div>
        </div>
      </div>

      {/* Sounds Content */}

      <MusicCard
        setSelectedSong={setSelectedSong}
        volume={volume}
        setVolume={setVolume}
      />
    </div>
  );
};

export default Home;
