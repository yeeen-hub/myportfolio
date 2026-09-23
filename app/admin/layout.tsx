import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "./sidebar";
import "../globals.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Second line of defense after proxy.ts. Layouts don't re-run when you
  // navigate between /admin pages, so the proxy covers that gap.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/");

  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-10 bg-[var(--bg-base)] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
