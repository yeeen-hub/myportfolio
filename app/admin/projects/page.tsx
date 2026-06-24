"use client";

import { useState } from "react";

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "DOST Tourist System",
      desc: "Internship project for tourism management.",
      cat: "Next.js",
      image: null,
    },
  ];

  return (
    <div className="flex-1 p-6 text-[var(--foreground)] bg-[var(--background)]">

      {/* HEADER */}
      <div className="flex items-end justify-between pb-6 border-b border-[var(--border)] mb-6">
        
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
            Admin Panel
          </div>

            <h1 className="text-2xl font-bold">Edit Projects</h1>

            <p className="text-sm text-[var(--text-muted)]">
              Manage your portfolio projects
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded
            bg-[var(--accent)] text-black font-semibold
            hover:bg-[var(--accent-dim)] transition"
          >
            + New Project
          </button>
        </div>

        {/* COUNT */}
        <div className="flex items-center gap-2 mb-4 text-sm text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
          {projects.length} project(s) in portfolio
        </div>

        {/* EMPTY STATE / LIST */}
        {projects.length === 0 ? (
          <div className="text-center py-20 text-[var(--text-muted)] border border-[var(--border)] rounded-xl bg-[var(--surface)]">
            No projects yet
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-4 rounded-xl
                border border-[var(--border)]
                bg-[var(--surface)]
                hover:border-[var(--accent)]/40 transition"
              >
                {/* LEFT */}
                <div>
                  <div className="text-xs text-[var(--accent)] font-semibold">
                    {p.cat}
                  </div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {p.desc}
                  </div>
                </div>

                {/* ACTION */}
                <button className="px-3 py-1 text-sm rounded border border-[var(--border)] hover:border-[var(--accent)] transition">
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-xl bg-[var(--background)] border border-[var(--border)] p-6">
              
              {/* MODAL HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">New Project</h2>
                <button onClick={() => setOpen(false)}>✕</button>
              </div>

              {/* FORM */}
              <div className="space-y-3">
                <input
                  placeholder="Title"
                  className="w-full px-3 py-2 rounded bg-[var(--surface)] border border-[var(--border)]"
                />

                <input
                  placeholder="Category"
                  className="w-full px-3 py-2 rounded bg-[var(--surface)] border border-[var(--border)]"
                />

                <textarea
                  placeholder="Description"
                  className="w-full px-3 py-2 rounded bg-[var(--surface)] border border-[var(--border)]"
                />
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded border border-[var(--border)]"
                >
                  Cancel
                </button>

                <button className="px-3 py-2 rounded bg-[var(--accent)] text-black font-semibold">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
  );
}