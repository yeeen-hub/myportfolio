export default function AdminDashboard() {
  return (
    <div className="flex-1 p-6 text-[var(--foreground)] bg-[var(--background)]">

      {/* HEADER */}
      <div className="flex items-end justify-between pb-6 border-b border-[var(--border)] mb-6">
        
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
            Admin Panel
          </div>

          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Dashboard
          </h1>

          <p className="text-sm text-[var(--text-muted)] mt-1">
            Welcome back — your portfolio is live.
          </p>
        </div>

        <div className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-muted)]">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40 transition">
          <div className="text-2xl font-bold text-[var(--foreground)]">3</div>
          <div className="text-xs text-[var(--text-muted)]">Projects</div>
        </div>

        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40 transition">
          <div className="text-2xl font-bold text-[var(--foreground)]">1</div>
          <div className="text-xs text-[var(--text-muted)]">Resume</div>
        </div>

        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40 transition">
          <div className="text-2xl font-bold text-[var(--accent)]">Live</div>
          <div className="text-xs text-[var(--text-muted)]">Status</div>
        </div>

      </div>

      {/* SECTION */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <h2 className="font-semibold">My Resume</h2>
          </div>

          <button className="px-4 py-2 rounded bg-[var(--accent)] text-black font-semibold hover:bg-[var(--accent-dim)] transition">
            Upload Resume
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 min-h-[200px] flex items-center justify-center text-[var(--text-muted)]">
          Empty state or preview here
        </div>

      </div>
    </div>
  );
}