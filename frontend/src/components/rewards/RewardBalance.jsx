import { useEffect } from "react";
import { useState } from "react";

const RewardBalance = () => {
  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    getWalletBalance();
  }, []);

  const getWalletBalance = async () => {
    try {
      const url = "http://localhost:8000/api/tasks/wallet";
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
    <div
      className="
        mb-10
        rounded-3xl
        border
        border-amber-400
        bg-amber-50
        dark:bg-[#FFF4DD]
        px-8
        py-8
      "
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <p className="text-3xl text-amber-800 font-medium">
            Available balance
          </p>

          <h2 className="mt-2 text-6xl font-bold text-amber-900">
            ${walletBalance ? walletBalance : 0}
          </h2>
        </div>

        {/* Right */}
        <div className="text-right max-w-sm">
          <p className="text-2xl text-amber-800 leading-snug">
            Earn
            <span className="font-bold"> $2.00 </span>
            more to unlock the
            <br />
            next reward tier
          </p>
        </div>
      </div>
    </div>
  );
};

export default RewardBalance;
