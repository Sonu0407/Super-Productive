import { Circle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const TaskCard = ({ task, onOpen, onDelete, title, reward }) => {
  const deleteTaskSound = new Audio("/sounds/delete-task.wav");
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);

    // wait for animation
    setTimeout(() => {
      onDelete(task);
      deleteTaskSound.play();
    }, 700);
  };

  return (
    <div
      className={`transition-all duration-500 ${
        completed ? "opacity-0 scale-95" : "opacity-100"
      }`}
    >
      <div
        className="
        border border-gray-200
        dark:border-[#505050]
        bg-white
        dark:bg-[#2f2f2f]
        rounded-xl
        px-4
        py-3
        flex
        items-center
        justify-between
        hover:bg-gray-50
        dark:hover:bg-[#383838]
        transition
      "
      >
        <div className="flex items-center gap-3">
          <button
            onClick={handleComplete}
            className="transition-all duration-300"
          >
            {completed ? (
              <CheckCircle2
                size={25}
                className="text-green-500 scale-100 animate-bounce"
              />
            ) : (
              <Circle
                size={18}
                strokeWidth={2}
                className="
            text-gray-300
            dark:text-[#8a8a8a]
          "
                onClick={() => {
                  console.log("Clicked");
                }}
              />
            )}
          </button>

          <p
            className="
            text-sm
            lg:text-base
            font-medium
            text-gray-800
            dark:text-[#f1f1f1]
          "
          >
            {title}
          </p>
        </div>

        <button
          onClick={onOpen}
          className="
          bg-amber-50
          dark:bg-[#fff6df]
          text-amber-700
          dark:text-[#a45a00]
          px-3
          py-1
          rounded-full
          text-sm
          font-semibold
        "
        >
          {reward ? reward : "Add timer to start"}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
