import { useState, createContext, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

// Create context for authentication
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  // Function to handle user registration
  const register = async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      if (!response.data.authInfo.authenticated) {
        setIsAuthenticated(false);
        setUsername("");
        return response.data.message;
      } else {
        setIsAuthenticated(true);
        setUsername(response.data.authInfo.username);
        return "success";
      }
    } catch (err) {
      console.error("Error registering:", err);
      setIsAuthenticated(false);
      setUsername("");
      return "Error registering, please try again!";
    }
  };

  // Function to handle user login
  const login = async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      if (!response.data.authInfo.authenticated) {
        setIsAuthenticated(false);
        setUsername("");
        return "Error: Authentication failed!";
      } else {
        setIsAuthenticated(true);
        setUsername(response.data.authInfo.username);
        return "success";
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setIsAuthenticated(false);
      setUsername("");
      return "Error logging in, please try again!";
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (!response.data.authInfo.authenticated) {
        setIsAuthenticated(false);
        setUsername("");

      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to check user's authentication status
  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/auth/checkauth");
      if (response && response.data) {
        setIsAuthenticated(response.data.authInfo.authenticated);
        setUsername(response.data.authInfo.username);
      } else {
        setIsAuthenticated(false);
        setUsername("");
      }
    } catch (err) {
      console.error("Error checking auth:", err);
      setIsAuthenticated(false);
      setUsername("");
    }
  };

  // Test function for cookies (can be removed if not needed)
  const testCookie = async () => {
    const response = await axiosInstance.get("/auth/testcookie");
    console.log(response);
    return response.data;
  };

  // Effect to check authentication status on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Provide auth context values
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        register,
        login,
        logout,
        checkAuth,
        testCookie,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
