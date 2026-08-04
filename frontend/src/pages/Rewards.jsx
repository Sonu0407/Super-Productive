import Navbar from "../components/Navbar";
import RewardBalance from "../components/rewards/RewardBalance";
import RewardSection from "../components/rewards/RewardSection";
import {
  FaSteam,
  FaPlaystation,
  FaXbox,
  FaSpotify,
  FaDiscord,
} from "react-icons/fa";
import { AiFillAmazonCircle } from "react-icons/ai";
import { SiZomato } from "react-icons/si";
import { RiNetflixFill } from "react-icons/ri";
import { useEffect, useState } from "react";

const wallet = Number(localStorage.getItem("wallet_balance")); // localStorage always returns string, not a number

const gamingRewards = [
  {
    icon: <FaSteam />,
    color: "bg-slate-800",
    title: "Steam Wallet",
    subtitle: "$5 game credit",
    price: 100.0,
    code: 1,
  },
  {
    icon: <FaPlaystation />,
    color: "bg-blue-700",
    title: "PlayStation Store",
    subtitle: "$5 store credit",
    price: 160.0,
    code: 2,
  },
  {
    icon: <FaXbox />,
    color: "bg-green-700",
    title: "Xbox Gift Card",
    subtitle: "$5 store credit",
    price: 200.0,
    code: 3,
  },
];

const shoppingRewards = [
  {
    icon: <AiFillAmazonCircle />,
    color: "bg-orange-500",
    title: "Amazon",
    subtitle: "$5 gift card",
    price: 150.0,
    code: 4,
  },
  {
    icon: <SiZomato />,
    color: "bg-red-500",
    title: "Zomato",
    subtitle: "$3 food voucher",
    price: 50.0,
    code: 5,
  },
  {
    icon: "M",
    color: "bg-pink-500",
    title: "Myntra",
    subtitle: "$4 shopping voucher",
    price: 120.0,
    code: 6,
  },
];

const entertainmentRewards = [
  {
    icon: <FaSpotify />,
    color: "bg-green-500",
    title: "Spotify Premium",
    subtitle: "1 month credit",
    price: 65.5,
    code: 7,
  },
  {
    icon: <RiNetflixFill />,
    color: "bg-red-600",
    title: "Netflix",
    subtitle: "$5 gift card",
    price: 500.0,
    code: 8,
  },
  {
    icon: <FaDiscord />,
    color: "bg-indigo-400",
    title: "Discord Nitro",
    subtitle: "1 month credit",
    price: 100.0,
    code: 9,
  },
];

const Rewards = () => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="max-w-[1440px] mx-auto px-4 py-4">
        <Navbar walletBalance={walletBalance} />

        <div className="mt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Rewards Store
            </h1>

            <p className="mt-2 text-xl text-gray-500 dark:text-gray-400">
              Redeem your earnings for real vouchers and game credits
            </p>
          </div>

          {/* Balance Card */}
          <RewardBalance walletBalance={walletBalance} />

          {/* Gaming */}
          <RewardSection
            title="GAMING VOUCHERS"
            rewards={gamingRewards}
            walletBalance={walletBalance}
            reloadWalletBalance={getWalletBalance}
          />

          {/* Shopping */}
          <RewardSection
            title="SHOPPING & FOOD VOUCHERS"
            rewards={shoppingRewards}
            walletBalance={walletBalance}
            reloadWalletBalance={getWalletBalance}
          />

          {/* Entertainment */}
          <RewardSection
            title="ENTERTAINMENT"
            rewards={entertainmentRewards}
            walletBalance={walletBalance}
            reloadWalletBalance={getWalletBalance}
          />
        </div>
      </div>
    </div>
  );
};

export default Rewards;
