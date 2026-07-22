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
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  // Task panel's
  const [totalReward, setTotalReward] = useState(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("earningsDate");
    const storedValue = localStorage.getItem("todayEarnings");

    if (storedDate === today) {
      return storedValue ? Number(storedValue) : 0;
    }

    // New Day reset
    localStorage.setItem("earningsDate", today);
    localStorage.setItem("todayEarnings", 0);

    return 0;
  });

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
              setTotalReward={setTotalReward}
              setTaskDeleted={setTaskDeleted}
              completedTaskCount={completedTaskCount}
              setCompletedTaskCount={setCompletedTaskCount}
            />
          </div>

          <div>
            <TaskPanel
              totalReward={totalReward}
              setTotalReward={setTotalReward}
              taskDeleted={taskDeleted}
              setTaskDeleted={setTaskDeleted}
              completedTaskCount={completedTaskCount}
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
