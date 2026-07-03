import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const url = "http://localhost:8000/api/auth/me";
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }
      setAuthUser(data);
      navigate("/");
    } catch (error) {
      console.error("Error in checkAuth:", error);
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
