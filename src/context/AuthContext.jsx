import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MOCK_USERS } from "../data/mockUsers";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("nexustalent-user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async ({ email, password, role }) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const foundUser = MOCK_USERS.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password &&
        item.role === role
    );

    if (!foundUser) {
      throw new Error("Invalid email, password, or selected role.");
    }

    const loggedUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      avatar: foundUser.avatar,
      status: foundUser.status,
    };

    setUser(loggedUser);
    localStorage.setItem("nexustalent-user", JSON.stringify(loggedUser));

    return loggedUser;
  };

  const register = async ({ name, email, role }) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      avatar: name
        ? name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "NT",
      status: "Active",
    };

    setUser(newUser);
    localStorage.setItem("nexustalent-user", JSON.stringify(newUser));

    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nexustalent-user");
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}