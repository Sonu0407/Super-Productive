import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = ({ walletBalance }) => {
  const navigate = useNavigate();
  const { checkAuth } = useContext(AuthContext);

  const [animateReward, setAnimateReward] = useState(false);
  const [rewardIncrease, setRewardIncrease] = useState(null);
  const prevBalance = useRef(walletBalance || 0);

  useEffect(() => {
    const current = Number(walletBalance || 0);
    const previous = Number(prevBalance.current);

    if (current > previous) {
      setRewardIncrease(current - previous);
      setAnimateReward(true);

      setTimeout(() => {
        setAnimateReward(false);
        setRewardIncrease(null);
      }, 2500);
    }

    prevBalance.current = current;
  }, [walletBalance]);

  const handleLogout = async () => {
    try {
      const url = "http://localhost:8000/api/auth/logout";

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      toast.success("Logout successful");
      checkAuth();
      navigate("/login");
    } catch (error) {
      console.error("Error in handleLogout:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#4a4a4a] rounded-3xl px-6 py-4 flex items-center justify-between">
      <div className="flex gap-6">
        <Link to="/" className="font-semibold text-gray-900 dark:text-white">
          Home
        </Link>

        <Link to="/rewards" className="text-gray-500 dark:text-[#c8c8c8]">
          Rewards
        </Link>

        <button className="text-gray-500 dark:text-[#c8c8c8]">History</button>
      </div>

      <h1 className="text-2xl lg:text-4xl font-bold text-black dark:text-white">
        Super Productive
      </h1>

      <div className="flex items-center gap-6">
        <div className="relative">
          {rewardIncrease && (
            <div
              className="
                absolute
                -top-8
                left-1/2
                -translate-x-1/2
                text-green-500
                font-bold
                animate-bounce
                whitespace-nowrap
                pointer-events-none
              "
            >
              +${rewardIncrease}
            </div>
          )}

          <div
            className={`
              bg-amber-50
              dark:bg-[#f8eedb]
              text-amber-700
              dark:text-[#c96b1c]
              px-5
              py-3
              rounded-full
              font-semibold
              transition-all
              duration-500
              cursor-default
              ${
                animateReward
                  ? "scale-110 shadow-[0_0_35px_rgba(251,191,36,0.9)]"
                  : ""
              }
            `}
          >
            💰 ${walletBalance || 0} earned
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-gray-500 dark:text-[#c8c8c8] cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
