const RewardCard = ({ icon, color, title, subtitle, price, locked }) => {
  return (
    <div
      className="
        bg-white
        dark:bg-[#2f2f2f]
        border
        border-gray-200
        dark:border-[#505050]
        rounded-3xl
        p-6
        transition
        hover:shadow-lg
      "
    >
      {/* Icon */}
      <div
        className={`
          w-16
          h-16
          rounded-2xl
          ${color}
          text-white
          flex
          items-center
          justify-center
          text-3xl
          font-bold
          mb-5
        `}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="mt-1 text-gray-500 dark:text-gray-400">{subtitle}</p>

      {/* Price */}
      <div className="mt-5">
        <p className="text-4xl font-bold text-gray-900 dark:text-white">
          {price}
        </p>
      </div>

      {/* Button */}
      <button
        disabled={locked}
        className={`
          w-full
          mt-6
          py-3
          rounded-xl
          font-semibold
          transition

          ${
            locked
              ? `
                bg-gray-200
                text-gray-500
                cursor-not-allowed

                dark:bg-[#404040]
                dark:text-[#8b8b8b]
              `
              : `
                bg-red-500
                hover:bg-red-600
                text-white
              `
          }
        `}
      >
        {locked ? "Locked" : "Redeem"}
      </button>
    </div>
  );
};

export default RewardCard;
