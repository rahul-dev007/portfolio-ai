"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (!res?.ok) {
      setError("Invalid email or password");
      return;
    }

    window.location.href = res.url || callbackUrl;
  }

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-[#05060d] via-[#0b0b12] to-black
        animate-[gradient_12s_ease_infinite]
      "
    >
      <Card
        className="
          w-full max-w-md rounded-2xl
          border border-white/20
          bg-white/5 backdrop-blur-xl
          shadow-[0_0_40px_rgba(255,255,255,0.15)]
        "
      >
        <CardHeader className="space-y-1">
          <CardTitle
            className="
              text-2xl font-bold
              bg-gradient-to-r from-white to-white/70
              bg-clip-text text-transparent
            "
          >
            Admin Login
          </CardTitle>
          <p className="text-sm text-white/60">
            Secure access to dashboard
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label className="text-white/80">Email</Label>
              <Input
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  bg-black/40 border-white/20
                  text-white placeholder:text-white/30
                  focus:border-white/50
                "
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  bg-black/40 border-white/20
                  text-white placeholder:text-white/30
                  focus:border-white/50
                "
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="
                w-full rounded-xl
                bg-white text-black
                hover:bg-white/90
                transition
              "
            >
              {loading ? "Authenticating…" : "Enter Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
