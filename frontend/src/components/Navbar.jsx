import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const [walletBalance, setWalletBalance] = useState(null);
  const navigate = useNavigate();
  const { checkAuth } = useContext(AuthContext);

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

      console.log(data);
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
        <div className="bg-amber-50 dark:bg-[#f8eedb] text-amber-700 dark:text-[#c96b1c] px-5 py-3 rounded-full font-semibold">
          $4.50 earned
        </div>

        <button
          onClick={handleLogout}
          className="text-gray-500 dark:text-[#c8c8c8]  cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
