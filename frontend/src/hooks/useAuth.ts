import { useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  function login(username: string, password: string) {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAuth", "true");
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  }

  function logout() {
    localStorage.removeItem("isAuth");
    setIsAuthenticated(false);
    window.location.href = "/login";
  }

  return { isAuthenticated, login, logout };
}
