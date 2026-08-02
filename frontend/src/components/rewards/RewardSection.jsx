import { useEffect, useState } from "react";
import RewardCard from "./RewardCard";

const RewardSection = ({ title, rewards }) => {
  const balance = Number(localStorage.getItem("wallet_balance"));

  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    getWalletBalance();
  }, []);

  const getWalletBalance = async () => {
    try {
      const url = "http://localhost:8000/api/auth/wallet";
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      setWalletBalance(data.wallet_balance);
    } catch (error) {
      console.error("Error in getWalletBalance:", error);
    }
  };

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
            locked={walletBalance < reward.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RewardSection;

// localStorage.getItem("wallet_balance")
