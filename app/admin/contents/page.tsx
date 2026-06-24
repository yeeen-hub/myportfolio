export default function ContentsPage() {
  const landing = {
    heading: "Hi, I'm Your Name",
    subheading: "Frontend Developer",
    about_text:
      "I am a Computer Science graduate focused on building responsive and user-friendly web applications.",
    email: "your@email.com",
    github_link: "https://github.com/yourusername",
    github_username: "yourusername",
    fb_link: "https://facebook.com/yourprofile",
    facebook: "Facebook Profile",
    phone_number: "+63 912 345 6789",
  };

  const expertise = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind",
    "TypeScript",
    "Git",
  ];

  return (
    <div className="flex-1 bg-[var(--background)] text-[var(--foreground)] p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-[var(--border)] mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
            Admin Panel
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">
            Edit Contents
          </h1>

          <p className="text-sm text-[var(--text-muted)]">
            Manage your public-facing profile and content
          </p>
        </div>
      </div>

      {/* FORM WRAPPER (CENTERED) */}
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── PROFILE ── */}
        <Section title="Profile">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

            {/* avatar */}
            <div className="w-28 h-28 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
              <span className="text-[var(--text-muted)] text-sm">
                Avatar
              </span>
            </div>

            {/* upload info */}
            <div className="flex-1 space-y-3">
              <h3 className="font-semibold">Profile Photo</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Recommended: 400×400px JPG or PNG
              </p>

              <button className="px-4 py-2 rounded bg-[var(--accent)] text-black font-semibold hover:bg-[var(--accent-dim)] transition">
                Upload Photo
              </button>
            </div>
          </div>
        </Section>

        {/* ── HERO ── */}
        <Section title="Hero Section">
          <div className="grid md:grid-cols-2 gap-4">

            <Input label="Heading" value={landing.heading} />
            <Input label="Subheading" value={landing.subheading} />

            <div className="md:col-span-2">
              <Textarea label="About Text" value={landing.about_text} />
            </div>

          </div>
        </Section>

        {/* ── EXPERTISE ── */}
        <Section title="My Expertise">
          <div className="flex gap-2">
            <input
              placeholder="Add skill..."
              className="flex-1 px-4 py-2 rounded bg-[var(--surface)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <button className="px-4 py-2 rounded bg-[var(--accent)] text-black font-semibold">
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {expertise.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text-soft)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        {/* ── CONTACT ── */}
        <Section title="Contact & Socials">
          <div className="grid md:grid-cols-2 gap-4">

            <Input label="Email" value={landing.email} />
            <Input label="GitHub Username" value={landing.github_username} />
            <Input label="GitHub Link" value={landing.github_link} />
            <Input label="Facebook" value={landing.facebook} />
            <Input label="Facebook Link" value={landing.fb_link} />
            <Input label="Phone Number" value={landing.phone_number} />

          </div>
        </Section>

        {/* ── FOOTER ── */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
          <button className="px-4 py-2 rounded border border-[var(--border)] text-[var(--text-soft)]">
            Cancel
          </button>

          <button className="px-5 py-2 rounded bg-[var(--accent)] text-black font-semibold hover:bg-[var(--accent-dim)] transition">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

/* ───────────────────────────── */
/* REUSABLE COMPONENTS */
/* ───────────────────────────── */

function Section({ title, children }: any) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 md:p-6">
      <h2 className="text-sm font-bold text-[var(--accent)] mb-4 uppercase tracking-wider">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Input({ label, value }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-[var(--text-muted)]">{label}</label>
      <input
        defaultValue={value}
        className="w-full px-4 py-2 rounded bg-[var(--surface)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />
    </div>
  );
}

function Textarea({ label, value }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-[var(--text-muted)]">{label}</label>
      <textarea
        defaultValue={value}
        rows={5}
        className="w-full px-4 py-2 rounded bg-[var(--surface)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />
    </div>
  );
}