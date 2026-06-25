"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col space-y-8 font-[Audiowide] text-[var(--foreground)]">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Login</h1>

        <hr className="border-[var(--border)]" />

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded
            bg-[var(--surface)]
            text-[var(--foreground)]
            border border-[var(--border)]
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded
            bg-[var(--surface)]
            text-[var(--foreground)]
            border border-[var(--border)]
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            required
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded
            bg-[var(--accent)]
            text-black font-semibold
            hover:bg-[var(--accent-dim)]
            transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
