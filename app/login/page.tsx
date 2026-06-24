export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
  
  <div className="w-full max-w-md flex flex-col space-y-8 font-[Audiowide] text-[var(--foreground)]">

    <h1 className="text-3xl md:text-4xl font-bold text-center">
      Login
    </h1>

    <hr className="border-[var(--border)]" />

    <form className="space-y-4">

      {/* Username */}
      <input
        type="text"
        name="username"
        placeholder="Username"
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
        name="password"
        placeholder="Password"
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
        className="w-full px-4 py-2 rounded
        bg-[var(--accent)]
        text-black font-semibold
        hover:bg-[var(--accent-dim)]
        transition"
      >
        Login
      </button>

    </form>

  </div>
</div>
  );
}
