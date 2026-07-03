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

const gamingRewards = [
  {
    icon: <FaSteam />,
    color: "bg-slate-800",
    title: "Steam Wallet",
    subtitle: "$5 game credit",
    price: "$5.00",
    locked: true,
  },
  {
    icon: <FaPlaystation />,
    color: "bg-blue-700",
    title: "PlayStation Store",
    subtitle: "$5 store credit",
    price: "$5.00",
    locked: true,
  },
  {
    icon: <FaXbox />,
    color: "bg-green-700",
    title: "Xbox Gift Card",
    subtitle: "$5 store credit",
    price: "$5.00",
    locked: true,
  },
];

const shoppingRewards = [
  {
    icon: <AiFillAmazonCircle />,
    color: "bg-orange-500",
    title: "Amazon",
    subtitle: "$5 gift card",
    price: "$5.00",
    locked: true,
  },
  {
    icon: <SiZomato />,
    color: "bg-red-500",
    title: "Zomato",
    subtitle: "$3 food voucher",
    price: "$3.00",
    locked: false,
  },
  {
    icon: "M",
    color: "bg-pink-500",
    title: "Myntra",
    subtitle: "$4 shopping voucher",
    price: "$4.00",
    locked: true,
  },
];

const entertainmentRewards = [
  {
    icon: <FaSpotify />,
    color: "bg-green-500",
    title: "Spotify Premium",
    subtitle: "1 month credit",
    price: "$2.50",
    locked: false,
  },
  {
    icon: <RiNetflixFill />,
    color: "bg-red-600",
    title: "Netflix",
    subtitle: "$5 gift card",
    price: "$5.00",
    locked: true,
  },
  {
    icon: <FaDiscord />,
    color: "bg-indigo-400",
    title: "Discord Nitro",
    subtitle: "1 month credit",
    price: "$2.00",
    locked: false,
  },
];

const Rewards = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="max-w-[1440px] mx-auto px-4 py-4">
        <Navbar />

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
          <RewardBalance />

          {/* Gaming */}
          <RewardSection title="GAMING VOUCHERS" rewards={gamingRewards} />

          {/* Shopping */}
          <RewardSection
            title="SHOPPING & FOOD VOUCHERS"
            rewards={shoppingRewards}
          />

          {/* Entertainment */}
          <RewardSection title="ENTERTAINMENT" rewards={entertainmentRewards} />
        </div>
      </div>
    </div>
  );
};

export default Rewards;
