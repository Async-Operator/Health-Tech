import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const res = await axiosClient.get("/current-user");
      if (res.data.loggedIn) {
        setUser({ role: res.data.role, userId: res.data.userId });
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  const logout = async () => {
    await axiosClient.get("/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);