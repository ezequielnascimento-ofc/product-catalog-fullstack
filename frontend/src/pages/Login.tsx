import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Package, Sun, Moon } from "lucide-react";

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
  error?: string;
}

export default function LoginPage({ onLogin, error }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // 🔥 Aplica a classe "dark" no <html> dinamicamente
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    onLogin(username, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background transition-colors duration-300">
      <div className="w-full max-w-md space-y-8">
        {/* Branding */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center border border-border">
              <Package className="h-8 w-8 text-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-foreground">
            Product Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your products
          </p>
        </div>

        {/* Dark mode toggle */}
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-2">
            <Sun size={18} className="text-muted-foreground" />
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
            <Moon size={18} className="text-muted-foreground" />
          </div>
        </div>

        {/* Login Form */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-input"
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                <p className="text-sm text-destructive text-center">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Demo credentials: <span className="font-mono">admin / admin</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Product Management. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
