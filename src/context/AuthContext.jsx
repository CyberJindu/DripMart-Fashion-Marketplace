// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser as apiLoginUser,
  signupUser as apiSignupUser,
  getCurrentUser,
  setAuthToken,
  clearAuthToken,
} from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token + user on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      getCurrentUser()
        .then((data) => setUser(data))
        .catch(() => {
          clearAuthToken();
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login
  async function handleLogin(credentials) {
    const data = await apiLoginUser(credentials);
    if (data.token) {
      setAuthToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      
      const normalizedUser = { ...data.user, id: data.user._id };
      setUser(normalizedUser);
    }
    return data;
  }

  // Signup
  async function handleSignup(details) {
    const data = await apiSignupUser(details);
    if (data.token) {
      setAuthToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);

      const normalizedUser = { ...data.user, id: data.user._id };
      setUser(normalizedUser);
    }
    return data;
  }

  // Logout
  function logout() {
    clearAuthToken();
    localStorage.removeItem("authToken");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login: handleLogin, signup: handleSignup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
