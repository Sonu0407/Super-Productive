import React from "react";

const RewardCard = ({ task }) => {
  return (
    <div
      className="
        mt-3
        bg-amber-50
        border
        border-amber-300
        rounded-3xl
        p-6

        dark:bg-[#FFF7E6]
        dark:border-[#E5B94D]
      "
    >
      <div className="flex justify-between">
        <div>
          <p
            className="
              text-lg
              text-gray-700

              dark:text-[#8B5A00]
            "
          >
            Reward for this session
          </p>

          <h2
            className="
              text-5xl
              font-bold
              text-amber-800
              mt-3

              dark:text-[#A84B00]
            "
          >
            ${task?.rewards ?? 0}
          </h2>
        </div>

        <div className="text-right">
          <p
            className="
              text-lg
              text-gray-700

              dark:text-[#8B5A00]
            "
          >
            Bonus at 3 tasks
          </p>

          <h3
            className="
              text-3xl
              font-bold
              text-orange-600
              mt-3

              dark:text-[#FF6A00]
            "
          >
            +$0.50 🎯
          </h3>
        </div>
      </div>
    </div>
  );
};
// TODO : Add wallet balance in backend for new users
export default RewardCard;
