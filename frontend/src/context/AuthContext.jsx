import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = async () => {
      const refreshResponse = await fetch(
        "http://localhost:8000/api/refresh/",
        {
          method: "POST",
          credentials: "include",
        },
      );

      const refreshData = await refreshResponse.json();

      if (!refreshResponse.ok) {
        setAuthUser(null);
        return;
      }

      const newAccessToken = refreshData.accessToken;
      setAccessToken(newAccessToken);
      await checkAuth(newAccessToken);
    };
    refreshToken();
  }, []);

  const checkAuth = async (token) => {
    try {
      setLoading(true);

      const url = "http://localhost:8000/api/auth/me";
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        authUser,
        setAuthUser,
        loading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
