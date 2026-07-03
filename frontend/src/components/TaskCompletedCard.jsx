import React from "react";
import { Check } from "lucide-react";

const TaskCompletedCard = ({ title, reward }) => {
  return (
    <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <Check size={16} className="text-white" strokeWidth={3} />
        </div>

        <p className="text-sm lg:text-base text-gray-400 line-through font-medium">
          {title}
        </p>
      </div>

      <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
        {reward}
      </div>
    </div>
  );
};

export default TaskCompletedCard;
