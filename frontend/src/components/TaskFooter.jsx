import React from "react";

const TaskFooter = ({ tasks, CompletedTasksRewards }) => {
  let totalRewards = 0;

  // console.log(tasks);
  console.log(CompletedTasksRewards);

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].rewards) {
      totalRewards += tasks[i].rewards ? tasks[i].rewards : 0;
    }
  }

  // console.log(totalRewards);

  return (
    <div className="border-t border-gray-200 dark:border-[#4a4a4a] mt-6 pt-2 flex items-center justify-between">
      <span className="text-sm lg:text-lg text-gray-600 dark:text-[#c8c8c8] font-medium">
        Today's earnings
      </span>

      <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
        ${CompletedTasksRewards} / ${totalRewards}
      </span>
    </div>
  );
};

export default TaskFooter;
