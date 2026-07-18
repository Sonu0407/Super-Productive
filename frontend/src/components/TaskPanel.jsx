import TaskHeader from "./TaskHeader";
import TaskCompletedCard from "./TaskCompletedCard";
import TaskCard from "./TaskCard";
import TaskFooter from "./TaskFooter";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import TaskModal from "./TaskModel";

const TasksPanel = ({
  completedTasks,
  setCompletedTasks,
  totalReward,
  setTotalReward,
}) => {
  const [task, setTask] = useState("");
  const [reward, setReward] = useState(""); // no use no where used
  const [getAllTask, setGetAllTask] = useState([]); // 1
  const [selectedTask, setSelectedTask] = useState(null);
  const addTaskSound = new Audio("/sounds/add-task.wav");
  // const [completedTasks, setCompletedTasks] = useState(0); // 2
  // const [totalReward, setTotalReward] = useState(0); // 3
  // const deleteTaskSound = new Audio("/sounds/delete-task.wav");

  const updateToCompleted = async (task) => {
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
      }

      return data;
    } catch (error) {
      console.log("Error in updateToCompleted", error);
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      await updateToCompleted(task);

      await new Promise((resolve) => setTimeout(resolve, 700));

      const url = `http://localhost:8000/api/tasks/${task.id}`;

      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message);
      }

      // Remove immediately from UI
      setGetAllTask((prev) => prev.filter((tasks) => tasks.id !== task.id));

      console.log(task.rewards);

      toast.success("Task deleted successfully");
      setCompletedTasks((prev) => prev + 1);
      setTotalReward((prev) => prev + Number(task.rewards || 0));
      // deleteTaskSound.play();
    } catch (error) {
      toast.error(error.message);
    }
  };

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

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleTaskAdd = async () => {
    try {
      const url = "http://localhost:8000/api/tasks/";
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: task }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      console.log(data);
      console.log(Array.isArray(data));
      // setTask(data);
      toast.success("Task added successfully");
      addTaskSound.play();
      setTask("");
      await getAllTasks();
    } catch (error) {
      console.error("Error in handleTaskAdd:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl border border-gray-200 dark:border-[#4a4a4a] overflow-auto h-full flex flex-col">
      {/* Header */}
      <TaskHeader
        totalNumberOfTasks={getAllTask.length}
        numberOfCompletedTasks={completedTasks}
      />

      <div className="p-4 lg:p-6 flex flex-col flex-1">
        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            className="
          flex-1
          bg-[#e9edf3]
          dark:bg-[#2d2d2d]
          text-gray-800
          dark:text-white
          placeholder:text-gray-400
          dark:placeholder:text-[#c8c8c8]
          border
          border-transparent
          dark:border-[#555555]
          rounded-xl
          px-4
          py-4
          text-base
          outline-none
          focus:ring-1
          focus:ring-gray-500
        "
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />

          <button
            className="
          w-14
          h-14
          border
          border-gray-300
          dark:border-[#555555]
          bg-white
          dark:bg-[#2d2d2d]
          rounded-xl
          flex
          items-center
          justify-center
          hover:bg-gray-50
          dark:hover:bg-[#383838]
          transition
        "
            onClick={handleTaskAdd}
          >
            <Plus size={20} className="text-black dark:text-white" />
          </button>
        </div>

        {/* Completed */}
        {/* <h3 className="text-lg font-semibold text-gray-400 dark:text-[#9d9d9d] mt-3 mb-3">
          COMPLETED
        </h3>

        <div className="space-y-3">
          <TaskCompletedCard title="Write project proposal" reward="$1.50" />

          <TaskCompletedCard title="Review team pull requests" reward="$1.50" />

          <TaskCompletedCard title="Meditate for 10 min" reward="$1.50" />
        </div> */}

        {/* Remaining */}
        <h3 className="text-lg font-semibold text-gray-400 dark:text-[#9d9d9d] mt-3 mb-6">
          REMAINING
        </h3>

        <div className="max-h-55 overflow-y-auto space-y-4 mb-6 pr-2">
          {getAllTask.map((task) => {
            return (
              <TaskCard
                key={task.id}
                task={task}
                onOpen={() => setSelectedTask(task)}
                onDelete={handleDeleteTask}
                title={task.title}
                reward={task.reward}
              />
            );
          })}

          {/* <TaskCard title="Review team pull requests" reward="$1.00" />

          <TaskCard title="Meditate for 10 min" reward="$0.50" /> */}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6">
          <TaskFooter tasks={getAllTask} CompletedTasksRewards={totalReward} />
        </div>
      </div>
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={handleDeleteTask}
          onReloadTasks={getAllTasks}
        />
      )}
    </div>
  );
};

export default TasksPanel;
