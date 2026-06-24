import Sidebar from "./sidebar";
import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-10 bg-[var(--bg-base)] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}