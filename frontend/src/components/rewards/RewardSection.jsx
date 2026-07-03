import RewardCard from "./RewardCard";

const RewardSection = ({ title, rewards }) => {
  return (
    <div className="mb-10">
      {/* Section Heading */}
      <h2 className="text-2xl font-bold tracking-wide text-gray-500 dark:text-gray-400 mb-5">
        {title}
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rewards.map((reward, index) => (
          <RewardCard
            key={index}
            icon={reward.icon}
            color={reward.color}
            title={reward.title}
            subtitle={reward.subtitle}
            price={reward.price}
            locked={reward.locked}
          />
        ))}
      </div>
    </div>
  );
};

export default RewardSection;
