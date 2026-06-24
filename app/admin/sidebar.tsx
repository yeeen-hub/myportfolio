"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50
        w-7 h-7 rounded
        bg-[var(--accent)]
        text-black
        flex items-center justify-center
        shadow-lg"
            >
              ☰
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50
          top-0 left-0 h-full
          w-[240px]
          flex flex-col
          border-r border-[var(--border)]
          bg-[var(--bg-card)]
          transform transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* BRAND */}
        <div className="p-6 border-b border-[var(--border)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center text-black font-bold">
            A
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-[var(--foreground)]">
              Portfolio CMS
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              Admin Panel
            </span>
          </div>

          {/* CLOSE BUTTON (mobile only) */}
          <button
            onClick={() => setOpen(false)}
            className="ml-auto md:hidden text-[var(--text-muted)]"
          >
            ✕
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-3 flex flex-col gap-2">
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded text-[var(--text-soft)]
            hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/contents"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded text-[var(--text-soft)]
            hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition"
          >
            Contents
          </Link>

          <Link
            href="/admin/projects"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded text-[var(--text-soft)]
            hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition"
          >
            Projects
          </Link>
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-[var(--border)]">
          <Link
            href="/logout"
            className="block text-center px-4 py-2 rounded
            bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
          >
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
}
