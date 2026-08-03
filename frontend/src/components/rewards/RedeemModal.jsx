import { X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useUpdateWalletBalance from "../../hooks/UpdateWalletBalanceHook";
import toast from "react-hot-toast";

const RedeemModal = ({
  onClose,
  reward,
  selectedReward,
  reloadWalletBalance,
}) => {
  const { authUser } = useContext(AuthContext);
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // const walletBalance = useUpdateWalletBalance();

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

  const handleSendMail = async () => {
    try {
      setLoading(true);
      const url = "http://localhost:8000/api/sendMail/";
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: newEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return toast.success("Email sent successfully");
      }
    } catch (error) {
      console.error("Error in handleSendMail", error);
      return toast.error(error);
    } finally {
      setLoading(false);
      const updateWalletBalanceDecrease = async () => {
        try {
          const url = "http://localhost:8000/api/auth/update/wallet/decrease";
          const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              wallet_balance: selectedReward.price,
            }),
          });

          const data = await response.json();
          if (response.ok) {
            onClose();
            await reloadWalletBalance(); //prop drilling happended here
            return toast.success("Wallet Updated Successfully!.");
          }
        } catch (error) {
          console.error("Error in updateWalletBalanceDecrease", error);
          return toast.error(error);
        }
      };
      updateWalletBalanceDecrease();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white dark:bg-[#2a2a2a] rounded-3xl border border-gray-200 dark:border-[#4a4a4a] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#4a4a4a] px-6 py-5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reward Details
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3b3b3b] transition"
          >
            <X size={22} className="text-gray-500 dark:text-gray-300" />
          </button>
        </div>
        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Task Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Reward Provider
            </label>

            <input
              type="text"
              value={reward.title}
              className="
                w-full
                rounded-xl
                px-4
                py-3
                bg-[#e9edf3]
                dark:bg-[#333333]
                border
                border-gray-300
                dark:border-[#555]
                outline-none
                focus:ring-2
                focus:ring-red-400
                dark:text-white
              "
              readOnly
            />
          </div>

          {/* Reward */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Reward
            </label>

            <input
              type="text"
              value={reward.subtitle}
              //   onChange={(e) => setTitle(e.target.value)}
              className="
                w-full
                rounded-xl
                px-4
                py-3
                bg-[#e9edf3]
                dark:bg-[#333333]
                border
                border-gray-300
                dark:border-[#555]
                outline-none
                focus:ring-2
                focus:ring-red-400
                dark:text-white
              "
              readOnly
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>

            <input
              type="text"
              value={newEmail} // else use authUser.email for fixed email
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
              className="
                w-full
                rounded-xl
                px-4
                py-3
                bg-[#e9edf3]
                dark:bg-[#333333]
                border
                border-gray-300
                dark:border-[#555]
                outline-none
                focus:ring-2
                focus:ring-red-400
                dark:text-white
              "
              // readOnly
            />
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-[#4a4a4a] px-6 py-5 flex justify-end gap-3">
          <button
            onClick={() => {
              handleSendMail();
            }}
            className="
              px-6
              py-3
              rounded-xl
              bg-red-500
              hover:bg-red-600
              text-white
              font-semibold
              transition
            "
          >
            {loading ? "Redeeming..." : "Redeem"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedeemModal;
