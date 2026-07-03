import React from "react";
import { data } from "react-router-dom";

const TaskHeader = ({ totalNumberOfTasks, numberOfCompletedTasks }) => {
  const date = new Date();
  let tasks = totalNumberOfTasks;

  // for (let i = 0; i < numberOfCompletedTasks.length; i++) {
  //   if (numberOfCompletedTasks[i].completed) {
  //     completedTask += 1;
  //   }
  // }

  return (
    <div className="flex items-center justify-between px-4 lg:px-5 py-3 border-b border-gray-200 dark:border-[#4a4a4a]">
      <h2 className="text-lg lg:text-2xl font-semibold tracking-wide text-gray-500 dark:text-[#d0d0d0]">
        TODAY — {date.toDateString()}
      </h2>

      <span className="text-base lg:text-lg text-gray-400 dark:text-[#b0b0b0] font-medium">
        {numberOfCompletedTasks} of {tasks} done
      </span>
    </div>
  );
};

export default TaskHeader;
