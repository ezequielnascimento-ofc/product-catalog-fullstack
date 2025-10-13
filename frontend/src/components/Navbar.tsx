import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function CustomNavbar() {
  const [darkMode, setDarkMode] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground text-balance">
              Product Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your inventory and customer database
            </p>
          </div>
          <div className="flex justify-center items-center text-center gap-4">
            <div className="flex items-center gap-2">
              <Sun size={18} className="text-muted-foreground" />
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
              <Moon size={18} className="text-muted-foreground" />
            </div>
            <div className="flex justify-center items-center">
              <Button onClick={logout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
