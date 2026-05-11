"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("ai-builder-user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    setLoading(false);
  }, []);

  const signup = ({ firstName, lastName, email, password }) => {
    if (!firstName || !lastName || !email || !password)
      return { error: "All fields are required." };
    if (password.length < 6)
      return { error: "Password must be at least 6 characters." };

    const newUser = { firstName, lastName, email };
    localStorage.setItem("ai-builder-user", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    if (!email || !password)
      return { error: "All fields are required." };
    const newUser = { email, firstName: "", lastName: "" }; // Mock login
    localStorage.setItem("ai-builder-user", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("ai-builder-user");
    setUser(null);
  };

  // Mock password reset – just stores a flag (for demo)
  const resetPassword = (email) => {
    // In real app you'd send a request to your API
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);