import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiGift } from "react-icons/fi";
import toast from "react-hot-toast";
import { useState } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return toast.error("Please fill all the fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!agreement) {
      return toast.error("Please agree to the terms and conditions");
    }

    console.log({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      agreement,
    });

    // Handle registration logic here
    try {
      setLoading(true);
      const url = "http://localhost:8000/api/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      console.log(data);
      toast.success(data.message);
      setWalletBalance(data.user.wallet_balance);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(walletBalance);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] flex items-center justify-center px-4 pr-8">
      <div className="max-w-md mx-auto w-full">
        {/* Tabs */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Link
            to="/login"
            className="
              bg-gray-100 text-gray-700
              dark:bg-[#252523]
              dark:text-gray-300
              py-3 rounded-xl font-semibold text-center
            "
          >
            Login
          </Link>

          <button className="bg-red-500 text-white py-3 rounded-xl font-semibold">
            Register
          </button>
        </div>

        {/* Card */}
        <div
          className="
            bg-white border border-gray-200
            dark:bg-[#2f2f2d]
            dark:border-[#f2554a]
            rounded-3xl shadow-sm py-4 px-6
          "
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold dark:text-white">
              Super Productive
            </h1>

            <p className="text-gray-500 dark:text-gray-400">
              Create your account and start earning
            </p>
          </div>

          {/* Bonus Box */}
          <div
            className="
              flex items-center gap-3
              bg-green-50 border border-green-400
              dark:bg-[#eaf8f0]
              dark:border-[#4ade80]
              rounded-xl p-4 mb-3
            "
          >
            <FiGift className="text-green-700" size={20} />

            <p className="text-green-800 text-sm">
              Sign up bonus: get $2.00 in starter rewards
            </p>
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="First name"
                className="
                  w-full border border-gray-300
                  dark:border-[#575757]
                  dark:bg-[#2f2f2d]
                  dark:text-white
                  dark:placeholder:text-gray-500
                  rounded-xl py-3 pl-10 pr-4
                  focus:outline-none focus:ring-2 focus:ring-red-400
                "
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Last name"
                className="
                  w-full border border-gray-300
                  dark:border-[#575757]
                  dark:bg-[#2f2f2d]
                  dark:text-white
                  dark:placeholder:text-gray-500
                  rounded-xl py-3 pl-10 pr-4
                  focus:outline-none focus:ring-2 focus:ring-red-400
                "
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block mb-2 font-medium dark:text-gray-300">
              Email
            </label>

            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                placeholder="you@example.com"
                className="
                  w-full border border-gray-300
                  dark:border-[#575757]
                  dark:bg-[#2f2f2d]
                  dark:text-white
                  dark:placeholder:text-gray-500
                  rounded-xl py-3 pl-10 pr-4
                  focus:outline-none focus:ring-2 focus:ring-red-400
                "
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block mb-2 font-medium dark:text-gray-300">
              Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="password"
                placeholder="Create a password"
                className="
                  w-full border border-gray-300
                  dark:border-[#575757]
                  dark:bg-[#2f2f2d]
                  dark:text-white
                  dark:placeholder:text-gray-500
                  rounded-xl py-3 pl-10 pr-4
                  focus:outline-none focus:ring-2 focus:ring-red-400
                "
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="block mb-2 font-medium dark:text-gray-300">
              Confirm password
            </label>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="password"
                placeholder="Re-enter password"
                className="
                  w-full border border-gray-300
                  dark:border-[#575757]
                  dark:bg-[#2f2f2d]
                  dark:text-white
                  dark:placeholder:text-gray-500
                  rounded-xl py-3 pl-10 pr-4
                  focus:outline-none focus:ring-2 focus:ring-red-400
                "
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 mb-3">
            <input
              type="checkbox"
              onClick={() => setAgreement(!agreement)}
              className="mt-1 accent-red-500"
            />

            <p className="text-sm text-gray-600 dark:text-gray-300">
              I agree to the{" "}
              <span className="text-red-500 cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-red-500 cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>

          {/* Button */}
          <button
            className="
              w-full bg-black text-white
              dark:bg-[#2f2f2d]
              dark:border dark:border-[#575757]
              py-3 rounded-xl font-semibold text-lg
              hover:bg-gray-900 transition
            "
            onClick={handleRegister}
          >
            {loading ? "Loading..." : "Create account"}
          </button>

          {/* Footer */}
          <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
