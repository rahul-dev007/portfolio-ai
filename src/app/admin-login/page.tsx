"use client";

// 🚨 THIS LINE IS THE REAL FIX
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/admin/dashboard",
    });

    setLoading(false);

    if (!res?.ok) {
      setError("Invalid email or password");
      return;
    }

    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={onSubmit} className="space-y-4 w-80">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button disabled={loading}>
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
    </div>
  );
}
