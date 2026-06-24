import Link from "next/link";

export default function Home() {
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
  };

  const projects = [
    {
      id: 1,
      project_title: "DOST Tourist Management System",
      project_desc:
        "A web-based system developed during my internship for managing tourist data and improving tourism operations.",
      project_cat: "Next.js, Tailwind, API",
    },
    {
      id: 2,
      project_title: "Portfolio Website",
      project_desc:
        "Personal developer portfolio built using Next.js and Tailwind CSS.",
      project_cat: "React, Next.js",
    },
    {
      id: 3,
      project_title: "Landing Page UI",
      project_desc: "Responsive landing page design with modern UI principles.",
      project_cat: "HTML, CSS, JS",
    },
  ];

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

  const resume = {
    filename: "resume.pdf",
  };

  return (
    <>
    <div className="p-6 min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-[900px] mx-auto">
        {/* HERO */}
        <div
          className="md:col-span-7 row-span-2 min-h-[300px] flex flex-col relative rounded-3xl p-6
          bg-[var(--glass)] border border-[var(--glass-border)] backdrop-blur-[18px]"
            >
          <div className="flex items-center gap-2 mb-5">
            <Link href="/admin">
              <span className="block w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_10px_var(--accent)]" />
            </Link>
            
            <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
              Online
            </span>

            <Link
              href="/about"
              className="ml-auto w-11 h-11 rounded-full flex items-center justify-center
          bg-[var(--accent)]/20 border border-[var(--glass-border)] text-[var(--accent)] font-bold"
            >
              Y
            </Link>
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            {landing.heading}
            <br />
            <span className="text-xl text-[var(--text-muted)] italic">
              {landing.subheading}
            </span>
          </h1>

          <p className="mt-auto pt-5 text-sm text-[var(--text-soft)] max-w-[340px] leading-relaxed">
            {landing.about_text}
          </p>

        </div>

        {/* STATUS */}
        <div
          className="md:col-span-5 p-6 rounded-3xl
      bg-[var(--glass)] border border-[var(--glass-border)]"
        >
          <p className="text-xs uppercase text-[var(--text-muted)]">Based in</p>

          <h2 className="text-xl font-bold mt-1">🇵🇭 Philippines</h2>

          <div
            className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full
        bg-[var(--accent)]/20 border border-[var(--glass-border)] text-[var(--accent)] text-xs"
          >
            <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
            Open to remote work
          </div>
        </div>

        {/* CONTACT */}
        <div
          className="md:col-span-5 p-6 rounded-3xl
      bg-[var(--glass)] border border-[var(--glass-border)]"
        >
          <p className="text-xs uppercase text-[var(--text-muted)]">
            Get in touch
          </p>

          <div className="flex flex-col gap-2 mt-3 text-sm text-[var(--text-soft)]">
            <a
              href={`https://mail.google.com/mail/?view=cm&to=${landing.email}`}
              target="_blank"
              className="hover:text-[var(--accent)] transition"
            >
              📧 {landing.email}
            </a>

            <a
              href={landing.github_link}
              target="_blank"
              className="hover:text-[var(--accent)] transition"
            >
              💻 {landing.github_username}
            </a>

            <a
              href={landing.fb_link}
              target="_blank"
              className="hover:text-[var(--accent)] transition"
            >
              📘 {landing.facebook}
            </a>
          </div>
        </div>

        {/* PROJECTS */}
        <div
          className="md:col-span-12 p-6 rounded-3xl
      bg-[var(--glass)] border border-[var(--glass-border)]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs uppercase text-[var(--text-muted)]">
              Projects
            </h3>

            <Link href="/projectslist" className="text-[var(--accent)]">
              ↗
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {projects.map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="p-4 rounded-xl bg-[var(--surface)]
            border border-[var(--glass-border)]
            hover:border-[var(--glass-border-hover)]
            hover:bg-[var(--accent)]/10 transition"
              >
                <p className="text-[var(--accent)] text-xs font-bold">
                  0{i + 1}
                </p>

                <h4 className="font-bold text-sm mt-1 text-[var(--foreground)]">
                  {project.project_title}
                </h4>

                <p className="text-xs text-[var(--text-soft)] mt-1 line-clamp-2">
                  {project.project_desc}
                </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {project.project_cat.split(",").map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-[2px] rounded
                  bg-[var(--tag-bg)] text-[var(--tag-text)]"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* TECH STACK */}
        <div
          className="md:col-span-6 p-6 rounded-3xl
      bg-[var(--glass)] border border-[var(--glass-border)]"
        >
          <h3 className="text-xs uppercase text-[var(--text-muted)]">
            Tech Stack
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
            {expertise.map((skill, i) => (
              <div
                key={i}
                className="p-2 text-xs text-center rounded-xl
            bg-[var(--surface)]
            border border-[var(--glass-border)]
            text-[var(--text-soft)]
            hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="md:col-span-6 p-6 rounded-3xl
      bg-[var(--accent)]/20 border border-[var(--glass-border)]
      flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-1 bg-[var(--accent)] rounded mb-3" />

            <h2 className="text-xl font-bold text-[var(--foreground)]">
              Let&apos;s build something.
            </h2>

            <p className="text-sm text-[var(--text-soft)]">
              Open for opportunities.
            </p>
          </div>

          <a
            href={`/uploads/${resume.filename}`}
            className="mt-4 px-5 py-2 rounded-full
        bg-[var(--accent)]
        hover:bg-[var(--accent)]/80
        transition text-sm font-semibold text-center text-white"
          >
            Download Resume ↓
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
