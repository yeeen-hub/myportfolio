import { createBrowserClient } from "@supabase/ssr";

// For "use client" components. Stores the session in cookies so the
// server (proxy.ts, layouts) can see who is logged in.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
