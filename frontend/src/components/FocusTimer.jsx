import { useEffect, useRef, useState } from "react";
import RewardCard from "./RewardCard";
import { IoReloadCircle } from "react-icons/io5";
import toast from "react-hot-toast";

//music imports
import bonusRewardAudio from "../../public/sounds/Bonus reward sound.mp3";

const FocusTimer = ({
  selectedSong,
  setSelectedSong,
  setIsRunning,
  isRunning,
  volume,
  setVolume,
  reloadwalletBalance,
  setTotalReward,
  setTaskDeleted,
  completedTaskCount,
  setCompletedTaskCount,
}) => {
  const [currentTask, setCurrentTask] = useState("");
  const [focusSession, setFocusSession] = useState(0);
  const [getAllTask, setGetAllTask] = useState([]);
  const [reloading, setReloading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const defaultAudio = useRef(new Audio("/sounds/Brown-noise.mp3"));
  const [isItPlaying, setIsItPlaying] = useState(false);
  const [completedTaskCountForStreak, setCompletedTaskCountForStreak] =
    useState(() => {
      const today = new Date().toDateString();
      const storedDate = localStorage.getItem("earningsDate");
      const storedValue = localStorage.getItem("todayCompletedTasksForStreak");

      if (storedDate === today) {
        return storedValue ? Number(storedValue) : 0;
      }

      // New Day reset
      localStorage.setItem("todayCompletedTasksForStreak", 0);

      return 0;
    });

  useEffect(() => {
    localStorage.setItem(
      "todayCompletedTasksForStreak",
      completedTaskCountForStreak,
    );
  }, [completedTaskCountForStreak]);

  const songsArray = [
    "/sounds/Brown-noise.mp3",
    "/sounds/Low-pink-noise.mp3",
    "/sounds/Rain with thunder noise.wav",
    "/sounds/Ambient Piano Sound.mp3",
    "/sounds/Coffee shop ambience noise.mp3",
    "/sounds/Ocean waves noise.mp3",
  ];
  let audioRef = useRef(new Audio());
  const cashRegisterSound = useRef(
    new Audio("/sounds/cash registered sound.mp3"),
  );
  const deleteTaskSound = useRef(new Audio("/sounds/delete-task.wav"));
  const [walletUpdated, setWalletUpdated] = useState(false);
  let BonusRewardSound = useRef(null);

  useEffect(() => {
    BonusRewardSound.current = new Audio(bonusRewardAudio);

    return () => {
      if (BonusRewardSound.current) {
        BonusRewardSound.current.pause();
        BonusRewardSound.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (selectedSong === null || selectedSong === undefined) {
      return;
    }
    defaultAudio.current.pause();
    audioRef.current.pause();
    audioRef.current.src = songsArray[selectedSong];
    audioRef.current.load();
    if (isItPlaying) {
      audioRef.current.play();
    } else {
      toast.error("Please select the task and start focusing!");
    }
    audioRef.current.loop = true;
  }, [selectedSong]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
    defaultAudio.current.volume = volume / 100;
  }, [volume]);

  console.log(typeof songsArray[selectedSong]);

  console.log(songsArray[selectedSong]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const url = "http://localhost:8000/api/tasks/";
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      const rewardsTask = data.tasks.filter((task) => task.rewards !== null);

      console.log(rewardsTask);

      setGetAllTask(rewardsTask);
      console.log(Array.isArray(data));
      console.log(data.tasks);
    } catch (error) {
      console.log("Error in getAllTasks:", error);
    }
  };

  const handleReload = async () => {
    try {
      setReloading(true);
      await getAllTasks();
    } finally {
      setReloading(false);
    }
  };

  useEffect(() => {
    if (selectedTask) {
      getCurrentTaskDetails();
    }
  }, [selectedTask, setSelectedTask]);
  const getCurrentTaskDetails = async () => {
    console.log(selectedTask);
    try {
      const url = `http://localhost:8000/api/tasks/${selectedTask}`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      setCurrentTask(data.task);
      setFocusSession(data.task.focus_session);
      console.log(data.task);
    } catch (error) {
      console.log("Error in getCurrentTaskDetails:", error);
    }
  };

  const [timeLeft, setTimeLeft] = useState(
    focusSession != null ? focusSession * 60 : null,
  ); // pass the time in the seconds to reformat it later

  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(focusSession * 60);
  }, [focusSession]);

  // function to format time
  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    // return in the format
    return `${hrs > 0 ? String(hrs).padStart(2, "0") + ":" : ""}${String(mins).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            audioRef.current.pause();
            defaultAudio.current.pause();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // calculating the circle
  const MAX_MINUTES = 60;
  const radius = 42;
  const circumference = Math.floor(2 * Math.PI * radius);
  const safeMinutes = Math.min(currentTask?.focus_session || 0, MAX_MINUTES);
  const progress = safeMinutes / MAX_MINUTES;
  const [totalProgress, setTotalProgress] = useState();
  const ref = useRef(null);

  useEffect(() => {
    setTotalProgress(Math.floor(circumference * progress));
  }, [circumference, progress]);

  console.log(circumference);
  console.log(totalProgress);

  const [strokeDashoffset, setStrokeDashoffset] = useState();

  useEffect(() => {
    setStrokeDashoffset(Math.floor(circumference - totalProgress));
  }, [totalProgress]);

  useEffect(() => {
    if (isRunning) {
      console.log("console log from", totalProgress);
      console.log("console log from", focusSession);
      const reducePerMinute = totalProgress / focusSession;
      // now per minute reduce the number which you got
      ref.current = setInterval(() => {
        if (totalProgress >= 0) {
          setTotalProgress((prev) => prev - reducePerMinute);
        }
      }, 60000);
    } else {
      clearInterval(ref.current);
    }

    return () => clearInterval(ref.current);
  }, [isRunning]);

  console.log(currentTask.rewards);

  console.log("Time Left:", timeLeft);

  const [loadingBonus, setLoadingBonus] = useState(false);

  useEffect(() => {
    console.log("Come here!");
    const bonus =
      completedTaskCount > 0 && completedTaskCount % 3 === 0 ? true : false; // for bonus reward
    if (bonus) {
      const updateWalletBalanceWithBonus = async () => {
        try {
          setLoadingBonus(true);
          console.log(loadingBonus);
          const url = "http://localhost:8000/api/auth/update/wallet";
          const response = await fetch(url ? url : undefined, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              wallet_balance: 0.5, // bonus reward
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.error || data.message || "Something went wrong",
            );
          } else {
            await reloadwalletBalance();
            console.log("I am at updateWalletBalanceWithBonus");
            deleteTaskSound.current.pause();
            cashRegisterSound.current.pause();
            BonusRewardSound.current.play();
          }

          console.log(data.message);
        } catch (error) {
          console.log("Error in updateWalletBalanceWithBonus", error);
        }
      };
      updateWalletBalanceWithBonus();
    }
  }, [completedTaskCount]);

  useEffect(() => {
    console.log(loadingBonus);
    if (timeLeft === 0 && selectedTask !== null) {
      const bonus =
        completedTaskCount > 0 && completedTaskCount % 3 === 0 ? true : false;
      console.log("Come here!");
      const updateWalletBalance = async () => {
        try {
          setWalletUpdated(false);
          const url = "http://localhost:8000/api/auth/update/wallet";
          const response = await fetch(url ? url : undefined, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              wallet_balance: currentTask.rewards,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.error || data.message || "Something went wrong",
            );
          } else {
            await reloadwalletBalance();
            cashRegisterSound.current.play();
          }

          console.log(data.message);
        } catch (error) {
          console.log("Error in updateWalletBalance", error);
        } finally {
          setWalletUpdated(true);
        }
      };
      updateWalletBalance();
    }
    console.log("Came here");
  }, [timeLeft]);

  const updateToCompleted = async (task) => {
    console.log(task);
    try {
      const url = `http://localhost:8000/api/tasks/${task.id}`;

      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          completed: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message);
      } else {
        setCompletedTaskCount((prev) => prev + 1);
        setCompletedTaskCountForStreak((prev) => (prev !== 7 ? prev + 1 : 7));
      }

      return data;
    } catch (error) {
      console.log("Error in updateToCompleted", error);
    }
  };

  useEffect(() => {
    if (walletUpdated) {
      // Deleting the current task after updating the wallet
      const deleteTask = async (currentTask) => {
        try {
          await updateToCompleted(currentTask);
          const taskToDelete = currentTask;
          const url = `http://localhost:8000/api/tasks/${taskToDelete.id}`;

          const response = await fetch(url ? url : undefined, {
            method: "DELETE",
            credentials: "include",
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || data.message);
          }

          console.log(getAllTask);

          const freshTasks = getAllTask.filter(
            (task) => task.id !== taskToDelete.id,
          );
          setGetAllTask(freshTasks);
          toast.success("Task deleted successfully");
          setTotalReward((prev) => prev + Number(taskToDelete.rewards || 0));
          setSelectedTask("");
          setCurrentTask("");
          setFocusSession(0);
          setTimeLeft(0);
          setTaskDeleted(true);
          if (loadingBonus) {
            deleteTaskSound.current.pause();
          } else {
            deleteTaskSound.current.play();
          }
        } catch (error) {
          console.log("Error in deleteTask", error);
          toast.error(error.message);
        }
      };
      deleteTask(currentTask);
    }
    setLoadingBonus(false);
  }, [walletUpdated]);

  console.log(strokeDashoffset);
  console.log(getAllTask);

  // for black streaks
  const blackStreaks = 7;

  return (
    <div className="bg-white dark:bg-[#2f2f2f] rounded-3xl border border-gray-200 dark:border-[#505050] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 lg:px-5 py-3 border-b border-gray-200 dark:border-[#505050]">
        <h2 className="text-xl lg:text-2xl font-semibold tracking-wide text-gray-500 dark:text-[#d3d3d3]">
          FOCUS TIMER
        </h2>

        <div className="flex items-center gap-3">
          <span className="text-base lg:text-lg text-gray-500 dark:text-[#b8b8b8]">
            Streak
          </span>

          <div className="flex gap-1.5">
            {Array.from({ length: completedTaskCountForStreak }).map(
              (_, index) => (
                console.log(completedTaskCount),
                (
                  <span
                    key={index}
                    className="w-2.5 h-2.5 rounded-full bg-red-500"
                  ></span>
                )
              ),
            )}
            {Array.from({
              length: blackStreaks - completedTaskCountForStreak,
            }).map((_, index) => (
              <span
                key={index}
                className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-[#1f1f1f]"
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 lg:p-4">
        {/* Task Select */}
        <div className="flex items-center justify-between gap-1">
          <select
            value={selectedTask || ""}
            onChange={(e) => {
              setSelectedTask(e.target.value);
              setIsRunning(false);
              console.log("Selected task id:", e.target.value);
            }}
            className="
            w-full
            border
            border-gray-200
            dark:border-[#5a5a5a]
            dark:bg-[#2f2f2f]
            dark:text-[#f2f2f2]
            rounded-xl
            px-4
            py-3
            text-gray-400
            dark:placeholder:text-[#a0a0a0]
            text-sm
            lg:text-base
            outline-none
          "
          >
            {/* disabled selected */}
            <option value="" disabled>
              Select task to focus on
            </option>
            {getAllTask.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
          <div>
            <IoReloadCircle
              size={50}
              className={` text-black dark:text-[#ffff] cusor-pointer transition-transform hover:scale-110 ${reloading ? "animate-spin" : "hover:rotate-180"}`}
              onClick={handleReload}
            />
          </div>
        </div>

        {/* Timer Circle */}
        <div className="flex justify-center mt-3">
          <div className="relative w-52 h-52 lg:w-60 lg:h-60">
            <svg
              className="w-full h-full rotate-[-90deg]"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#EAEAEA"
                strokeWidth="4"
              />

              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#F5534B"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="264"
                strokeDashoffset={strokeDashoffset}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-4xl lg:text-5xl font-bold dark:text-[#f5f5f5]">
                {formatTime(timeLeft)}
              </h1>

              <p className="text-gray-400 dark:text-[#b0b0b0] text-base mt-1">
                remaining
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <button
            disabled={!timeLeft}
            onClick={() => {
              setIsRunning(true);
              setIsItPlaying(true);
              if (selectedSong) {
                defaultAudio.current.pause();
                audioRef.current.play();
              } else {
                audioRef.current.pause();
                defaultAudio.current.play();
              }
            }}
            className="max-w-[300px] w-full border border-gray-200 dark:border-[#5a5a5a] dark:text-[#f2f2f2] rounded-xl py-3 text-base font-medium hover:bg-gray-50 dark:hover:bg-[#383838] transition"
          >
            Start
          </button>
          <button
            disabled={!timeLeft}
            onClick={() => {
              setIsRunning(false);
              setIsItPlaying(false);
              if (selectedSong) {
                defaultAudio.current.pause();
                audioRef.current.pause();
              }
              defaultAudio.current.pause();
            }}
            className="max-w-[300px] w-full border border-gray-200 dark:border-[#5a5a5a] dark:text-[#f2f2f2] rounded-xl py-3 text-base font-medium hover:bg-gray-50 dark:hover:bg-[#383838] transition"
          >
            Stop
          </button>
        </div>

        {/* Reward Card */}
        <div className="mt-3">
          <RewardCard task={currentTask} />
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
