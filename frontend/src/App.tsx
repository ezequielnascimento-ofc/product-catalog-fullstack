import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppRouter from "./AppRouter";

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
    <StrictMode>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </StrictMode>
  </HeroUIProvider>
);
