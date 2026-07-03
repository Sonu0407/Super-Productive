import { Link } from "react-router-dom";
import { Apple } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { checkAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Please fill all the fields");
    }
    try {
      setLoading(true);
      const url = "http://localhost:8000/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      console.log(data);
      toast.success("Login successful");
      await checkAuth();
      navigate("/");
    } catch (error) {
      console.error("Error in handleLogin:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] flex items-center justify-center px-4 pr-8">
      <div className="max-w-md mx-auto w-full">
        {/* Tabs */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button className="bg-red-500 text-white py-3 rounded-2xl font-semibold">
            Login
          </button>

          <Link
            to="/register"
            className="
              bg-gray-200 text-gray-600
              dark:bg-[#252523]
              dark:text-gray-300
              py-3 rounded-2xl font-semibold text-center
            "
          >
            Register
          </Link>
        </div>

        {/* Card */}
        <div
          className="
            bg-white border border-gray-200
            dark:bg-[#2f2f2d]
            dark:border-[#f2554a]
            rounded-3xl shadow-sm p-6
          "
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold dark:text-white">
              Super Productive
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Welcome back - your tasks are waiting
            </p>
          </div>

          {/* Alert */}
          <div
            className="
              bg-yellow-50 border border-yellow-300
              dark:bg-[#fff8e6]
              dark:border-[#f4c542]
              rounded-xl p-4 mb-6
            "
          >
            <p className="text-yellow-800 text-sm">
              Log in daily to keep your streak and earn bonus rewards
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-medium dark:text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full border border-gray-300
                dark:border-[#575757]
                dark:bg-[#2f2f2d]
                dark:text-white
                dark:placeholder:text-gray-500
                rounded-xl px-4 py-3
                focus:outline-none
                focus:ring-2 focus:ring-red-400
              "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 font-medium dark:text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="
                w-full border border-gray-300
                dark:border-[#575757]
                dark:bg-[#2f2f2d]
                dark:text-white
                dark:placeholder:text-gray-500
                rounded-xl px-4 py-3
                focus:outline-none
                focus:ring-2 focus:ring-red-400
              "
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between mb-5">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Remember me
              </span>
            </label>

            <button className="text-red-500 text-sm">Forgot Password?</button>
          </div>

          {/* Login */}
          <button
            className="
              w-full
              bg-black text-white
              dark:bg-[#2f2f2d]
              dark:border dark:border-[#575757]
              py-3 rounded-xl font-semibold text-lg
            "
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          {/* {/* Divider
          <div className="flex items-center my-3">
            <div className="flex-1 border-t dark:border-[#575757]"></div>

            <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">
              or continue with
            </span>

            <div className="flex-1 border-t dark:border-[#575757]"></div>
          </div> */}

          {/* Social
          <div className="grid grid-cols-2 gap-3">
            <button
              className="
                border rounded-xl py-3 font-semibold
                flex items-center justify-center gap-2
                hover:bg-gray-50 transition

                dark:border-[#575757]
                dark:text-white
                dark:hover:bg-[#3a3a38]
              "
            >
              <FcGoogle size={20} />
              Google
            </button>

            <button
              className="
                border rounded-xl py-3 font-semibold
                flex items-center justify-center gap-2
                hover:bg-gray-50 transition

                dark:border-[#575757]
                dark:text-white
                dark:hover:bg-[#3a3a38]
              "
            >
              <Apple size={20} />
              Apple
            </button>
          </div> */}

          {/* Footer */}
          <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-500 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
