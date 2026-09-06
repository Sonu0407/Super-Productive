import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const refreshResponse = await fetch(
          "http://localhost:8000/api/refresh/",
          {
            method: "POST",
            credentials: "include",
          },
        );

        if (!refreshResponse.ok) {
          setAuthUser(null);
          setAccessToken(null);
          return;
        }

        const refreshData = await refreshResponse.json();

        const newAccessToken = refreshData.accessToken;
        setAccessToken(newAccessToken);
        await checkAuth(newAccessToken);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        setAuthUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };
    refreshToken();
  }, []);

  const checkAuth = async (token) => {
    try {
      // setLoading(true);

      const url = "http://localhost:8000/api/auth/me";
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      setAuthUser(data);
      // navigate("/");
    } catch (error) {
      console.error("Error in checkAuth:", error);
      setAuthUser(null);
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
