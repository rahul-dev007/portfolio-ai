"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b12]">
      <Card className="w-full max-w-md bg-white/5 border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label className="text-white/80">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label className="text-white/80">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-400">{error}</p>}
            <Button disabled={loading} className="w-full">
              {loading ? "Authenticating…" : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
