import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const timerOptions = [15, 25, 45, 60];
// const reward = timerOptions.map((option) => `$${option / 60}`);
// console.log(reward);

const TaskModal = ({ task, onClose, onReloadTasks }) => {
  const [title, setTitle] = useState("");

  const [focus_session, setFocusSession] = useState(25);

  const rewards = (focus_session / 60).toFixed(2);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      //   setReward(task.reward || "");
      setFocusSession(task.focus_session || 25);
    }
  }, [task]);

  const handleUpdate = async () => {
    // console.log({
    //   id: task.id,
    //   title,
    //   rewards,
    //   timer,
    // });

    // TODO:
    // PUT /api/tasks/:id
    try {
      const url = `http://localhost:8000/api/tasks/${task.id}`;

      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          rewards,
          focus_session,
        }),
      });

      console.log("come here");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      console.log(data);
      toast.success("Task updated successfully");
      onReloadTasks();
    } catch (error) {
      console.log("Error in handleUpdate:", error);
      toast.error(error.message);
    }

    onClose();
  };

  const handleDelete = async () => {
    console.log(task.id);

    // TODO:
    // DELETE /api/tasks/:id
    try {
      const url = `http://localhost:8000/api/tasks/${task.id}`;
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      console.log(data);
      toast.success("Task deleted successfully");
      onReloadTasks();
    } catch (error) {
      console.log("Error in handleDelete:", error);
      toast.error(error.message);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white dark:bg-[#2a2a2a] rounded-3xl border border-gray-200 dark:border-[#4a4a4a] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#4a4a4a] px-6 py-5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Task Details
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3b3b3b] transition"
          >
            <X size={22} className="text-gray-500 dark:text-gray-300" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Task Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Task Name
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full
                rounded-xl
                px-4
                py-3
                bg-[#e9edf3]
                dark:bg-[#333333]
                border
                border-gray-300
                dark:border-[#555]
                outline-none
                focus:ring-2
                focus:ring-red-400
                dark:text-white
              "
            />
          </div>

          {/* Reward */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Reward
            </label>

            <input
              type="number"
              value={rewards}
              //   onChange={(e) => setReward(e.target.value)}
              placeholder="$1.50"
              className="
                w-full
                rounded-xl
                px-4
                py-3
                bg-[#e9edf3]
                dark:bg-[#333333]
                border
                border-gray-300
                dark:border-[#555]
                outline-none
                focus:ring-2
                focus:ring-red-400
                dark:text-white
              "
              readOnly
            />
          </div>

          {/* Timer */}
          <div>
            <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
              Focus Timer
            </label>

            <div className="grid grid-cols-4 gap-3">
              {timerOptions.map((value) => (
                <button
                  key={value}
                  onClick={() => {
                    setFocusSession(value);
                  }}
                  className={`
                    rounded-xl
                    py-3
                    font-semibold
                    transition

                    ${
                      focus_session === value
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 dark:bg-[#333333] text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-[#444]"
                    }
                  `}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-amber-50 dark:bg-[#3b321d] rounded-2xl border border-amber-300 dark:border-[#5a4722] p-4 flex justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-300">Reward</p>

              <h3 className="text-2xl font-bold text-amber-700 dark:text-[#ffc75f]">
                ${rewards || "0.00"}
              </h3>
            </div>

            <div className="text-right">
              <p className="text-gray-500 dark:text-gray-300">Timer</p>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {focus_session} min
              </h3>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-[#4a4a4a] px-6 py-5 flex justify-end gap-3">
          <button
            onClick={handleDelete}
            className="
              px-6
              py-3
              rounded-xl
              bg-red-500
              dark:bg-red-500/40
              text-red-600
              dark:text-red-300
              font-semibold
              hover:bg-red-600
              dark:hover:bg-red-900/60
              transition
            "
          >
            Delete
          </button>

          <button
            onClick={handleUpdate}
            className="
              px-6
              py-3
              rounded-xl
              bg-red-500
              hover:bg-red-600
              text-white
              font-semibold
              transition
            "
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
