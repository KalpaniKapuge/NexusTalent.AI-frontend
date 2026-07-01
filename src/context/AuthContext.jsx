/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "nexustalent-user";

const MOCK_USERS = {
  "candidate@demo.com": {
    id: 1,
    role: "candidate",
    name: "Kalpani Kapuge",
    email: "candidate@demo.com",
    avatar: "KK",
  },
  "employer@demo.com": {
    id: 2,
    role: "employer",
    companyId: "company-techcorp",
    companyName: "TechCorp Lanka",
    tenantSlug: "techcorp-lanka",
    name: "TechCorp Ltd",
    email: "employer@demo.com",
    avatar: "TC",
  },
  "admin@demo.com": {
    id: 3,
    role: "admin",
    name: "System Admin",
    email: "admin@demo.com",
    avatar: "SA",
  },
};

function getInitialUser() {
  const savedUser = localStorage.getItem(STORAGE_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function createAvatar(email) {
  return email.slice(0, 2).toUpperCase();
}

function createNameFromEmail(email) {
  return email.split("@")[0].replaceAll(".", " ");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const login = (email, password, role = "candidate") => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const mockUser = MOCK_USERS[normalizedEmail];

    const loggedUser = mockUser || {
      id: Date.now(),
      role,
      companyId: role === "employer" ? `company-${Date.now()}` : undefined,
      companyName: role === "employer" ? createNameFromEmail(normalizedEmail) : undefined,
      tenantSlug:
        role === "employer"
          ? createNameFromEmail(normalizedEmail).replaceAll(" ", "-")
          : undefined,
      name: createNameFromEmail(normalizedEmail),
      email: normalizedEmail,
      avatar: createAvatar(normalizedEmail),
    };

    setUser(loggedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));

    return loggedUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return null;
      }

      const updatedUser = {
        ...currentUser,
        ...updates,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      updateUser,
      isAuthenticated: Boolean(user),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
