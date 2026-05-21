"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Simple deterministic hash for client-side password storage
function hashPassword(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash.toString(16);
}

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

    const accounts = JSON.parse(localStorage.getItem("ai-builder-accounts") || "{}");
    if (accounts[email.toLowerCase()]) {
      return { error: "An account with this email already exists." };
    }

    accounts[email.toLowerCase()] = {
      firstName,
      lastName,
      passwordHash: hashPassword(password),
    };
    localStorage.setItem("ai-builder-accounts", JSON.stringify(accounts));

    const newUser = { firstName, lastName, email: email.toLowerCase() };
    localStorage.setItem("ai-builder-user", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    if (!email || !password)
      return { error: "All fields are required." };

    const accounts = JSON.parse(localStorage.getItem("ai-builder-accounts") || "{}");
    const account = accounts[email.toLowerCase()];

    if (!account) {
      return { error: "No account found with this email." };
    }
    if (account.passwordHash !== hashPassword(password)) {
      return { error: "Incorrect password." };
    }

    const loggedInUser = { firstName: account.firstName, lastName: account.lastName, email: email.toLowerCase() };
    localStorage.setItem("ai-builder-user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("ai-builder-user");
    setUser(null);
  };

  const resetPassword = (email) => {
    // In a real app, an email would be sent. This is a client-side demo.
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);