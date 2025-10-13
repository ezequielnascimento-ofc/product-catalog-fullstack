import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/Login";

export default function AppRouter() {
  const { isAuthenticated, login } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage onLogin={login} />
          )
        }
      />

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}
