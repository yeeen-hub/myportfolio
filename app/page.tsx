"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
  const [landing, setLanding] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setLanding(data);
    }

    async function fetchSkills() {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("id");

      if (error) {
        console.error("Error fetching skills:", error);
        return;
      }

      setSkills(data);
    }

    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id");

      if (!error) setProjects(data || []);
    }

    async function fetchResume() {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .maybeSingle();

      if (error) {
        console.error("Error fetching resume:", error);
        return;
      }

      setResume(data);
    }

    fetchProfile();
    fetchSkills();
    fetchProjects();
    fetchResume();
  }, []);

  if (!landing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="p-6 min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-[900px] mx-auto">
          {/* HERO */}
          <div
            className="md:col-span-7 row-span-2 min-h-[300px] flex flex-col relative rounded-3xl p-6
            bg-[var(--glass)] border border-[var(--glass-border)] backdrop-blur-[18px] hover:border-[var(--glass-border-hover)]"
          >
            <div className="flex items-center gap-2 mb-5">
              <Link href="/login">
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
                A
              </Link>
            </div>

            <h1 className="text-4xl font-bold leading-tight font-[Audiowide]">
              {landing.heading}
              <br />
              <span className="text-xl text-[var(--text-muted)]">
                {landing.subheading}
              </span>
            </h1>

            <p className="mt-auto pt-5 text-sm text-[var(--text-soft)] max-w-[340px] leading-relaxed">
              {landing.about}
            </p>
          </div>

          {/* STATUS */}
          <div
            className="md:col-span-5 p-6 rounded-3xl
            bg-[var(--glass)] border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)]"
          >
            <p className="text-xs uppercase text-[var(--text-muted)]">
              Based in
            </p>

            <h2 className="text-xl font-bold mt-1">🇵🇭 {landing.country}</h2>

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
            bg-[var(--glass)] border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)]"
          >
            <p className="text-xs uppercase text-[var(--text-muted)]">
              Get in touch
            </p>

            <div className="flex flex-col gap-3 mt-3 text-sm text-[var(--text-soft)]">
              <a
                href={`https://mail.google.com/mail/?view=cm&to=${landing.email}`}
                target="_blank"
                className="flex items-center gap-3 hover:text-[var(--accent)] transition"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                        stroke="#ffffff"
                        strokeWidth="2"
                        stroke-linecap="round"
                      ></rect>{" "}
                    </g>
                  </svg>
                </div>
                <span>{landing.email}</span>
              </a>

              <a
                href={landing.github_link}
                target="_blank"
                className="flex items-center gap-3 hover:text-[var(--accent)] transition"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4.0744 2.9938C4.13263 1.96371 4.37869 1.51577 5.08432 1.15606C5.84357 0.768899 7.04106 0.949072 8.45014 1.66261C9.05706 1.97009 9.11886 1.97635 10.1825 1.83998C11.5963 1.65865 13.4164 1.65929 14.7213 1.84164C15.7081 1.97954 15.7729 1.97265 16.3813 1.66453C18.3814 0.651679 19.9605 0.71795 20.5323 1.8387C20.8177 2.39812 20.8707 3.84971 20.6494 5.04695C20.5267 5.71069 20.5397 5.79356 20.8353 6.22912C22.915 9.29385 21.4165 14.2616 17.8528 16.1155C17.5801 16.2574 17.3503 16.3452 17.163 16.4167C16.5879 16.6363 16.4133 16.703 16.6247 17.7138C16.7265 18.2 16.8491 19.4088 16.8973 20.4002C16.9844 22.1922 16.9831 22.2047 16.6688 22.5703C16.241 23.0676 15.6244 23.076 15.2066 22.5902C14.9341 22.2734 14.9075 22.1238 14.9075 20.9015C14.9075 19.0952 14.7095 17.8946 14.2417 16.8658C13.6854 15.6415 14.0978 15.185 15.37 14.9114C17.1383 14.531 18.5194 13.4397 19.2892 11.8146C20.0211 10.2698 20.1314 8.13501 18.8082 6.83668C18.4319 6.3895 18.4057 5.98446 18.6744 4.76309C18.7748 4.3066 18.859 3.71768 18.8615 3.45425C18.8653 3.03823 18.8274 2.97541 18.5719 2.97541C18.4102 2.97541 17.7924 3.21062 17.1992 3.49805L16.2524 3.95695C16.1663 3.99866 16.07 4.0147 15.975 4.0038C13.5675 3.72746 11.2799 3.72319 8.86062 4.00488C8.76526 4.01598 8.66853 3.99994 8.58215 3.95802L7.63585 3.49882C7.04259 3.21087 6.42482 2.97541 6.26317 2.97541C5.88941 2.97541 5.88379 3.25135 6.22447 4.89078C6.43258 5.89203 6.57262 6.11513 5.97101 6.91572C5.06925 8.11576 4.844 9.60592 5.32757 11.1716C5.93704 13.1446 7.4295 14.4775 9.52773 14.9222C10.7926 15.1903 11.1232 15.5401 10.6402 16.9905C10.26 18.1319 10.0196 18.4261 9.46707 18.4261C8.72365 18.4261 8.25796 17.7821 8.51424 17.1082C8.62712 16.8112 8.59354 16.7795 7.89711 16.5255C5.77117 15.7504 4.14514 14.0131 3.40172 11.7223C2.82711 9.95184 3.07994 7.64739 4.00175 6.25453C4.31561 5.78028 4.32047 5.74006 4.174 4.83217C4.09113 4.31822 4.04631 3.49103 4.0744 2.9938Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        d="M3.33203 15.9454C3.02568 15.4859 2.40481 15.3617 1.94528 15.6681C1.48576 15.9744 1.36158 16.5953 1.66793 17.0548C1.8941 17.3941 2.16467 17.6728 2.39444 17.9025C2.4368 17.9449 2.47796 17.9858 2.51815 18.0257C2.71062 18.2169 2.88056 18.3857 3.05124 18.5861C3.42875 19.0292 3.80536 19.626 4.0194 20.6962C4.11474 21.1729 4.45739 21.4297 4.64725 21.5419C4.85315 21.6635 5.07812 21.7352 5.26325 21.7819C5.64196 21.8774 6.10169 21.927 6.53799 21.9559C7.01695 21.9877 7.53592 21.998 7.99999 22.0008C8.00033 22.5527 8.44791 23.0001 8.99998 23.0001C9.55227 23.0001 9.99998 22.5524 9.99998 22.0001V21.0001C9.99998 20.4478 9.55227 20.0001 8.99998 20.0001C8.90571 20.0001 8.80372 20.0004 8.69569 20.0008C8.10883 20.0026 7.34388 20.0049 6.67018 19.9603C6.34531 19.9388 6.07825 19.9083 5.88241 19.871C5.58083 18.6871 5.09362 17.8994 4.57373 17.2891C4.34391 17.0194 4.10593 16.7834 3.91236 16.5914C3.87612 16.5555 3.84144 16.5211 3.80865 16.4883C3.5853 16.265 3.4392 16.1062 3.33203 15.9454Z"
                        fill="#ffffff"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <span>{landing.github_username}</span>
              </a>

              <a
                href={landing.fb_link}
                target="_blank"
                className="flex items-center gap-3 hover:text-[var(--accent)] transition"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg width="20px" height="20px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" fill-rule="evenodd" d="M96 16c-44.183 0-80 35.817-80 80 0 13.12 3.163 25.517 8.771 36.455l-8.608 36.155a6.002 6.002 0 0 0 7.227 7.227l36.155-8.608C70.483 172.837 82.88 176 96 176c44.183 0 80-35.817 80-80s-35.817-80-80-80ZM28 96c0-37.555 30.445-68 68-68s68 30.445 68 68-30.445 68-68 68c-11.884 0-23.04-3.043-32.747-8.389a6.003 6.003 0 0 0-4.284-.581l-28.874 6.875 6.875-28.874a6.001 6.001 0 0 0-.581-4.284C31.043 119.039 28 107.884 28 96Zm46.023 21.977c11.975 11.974 27.942 20.007 45.753 21.919 11.776 1.263 20.224-8.439 20.224-18.517v-6.996a18.956 18.956 0 0 0-13.509-18.157l-.557-.167-.57-.112-8.022-1.58a18.958 18.958 0 0 0-15.25 2.568 42.144 42.144 0 0 1-7.027-7.027 18.958 18.958 0 0 0 2.569-15.252l-1.582-8.021-.112-.57-.167-.557A18.955 18.955 0 0 0 77.618 52H70.62c-10.077 0-19.78 8.446-18.517 20.223 1.912 17.81 9.944 33.779 21.92 45.754Zm33.652-10.179a6.955 6.955 0 0 1 6.916-1.743l8.453 1.665a6.957 6.957 0 0 1 4.956 6.663v6.996c0 3.841-3.124 6.995-6.943 6.585a63.903 63.903 0 0 1-26.887-9.232 64.594 64.594 0 0 1-11.661-9.241 64.592 64.592 0 0 1-9.241-11.661 63.917 63.917 0 0 1-9.232-26.888C63.626 67.123 66.78 64 70.62 64h6.997a6.955 6.955 0 0 1 6.66 4.957l1.667 8.451a6.956 6.956 0 0 1-1.743 6.917l-1.12 1.12a5.935 5.935 0 0 0-1.545 2.669c-.372 1.403-.204 2.921.603 4.223a54.119 54.119 0 0 0 7.745 9.777 54.102 54.102 0 0 0 9.778 7.746c1.302.806 2.819.975 4.223.603a5.94 5.94 0 0 0 2.669-1.545l1.12-1.12Z" clip-rule="evenodd"></path></g></svg>
                </div>
                <span>{landing.phone_number}</span>
              </a>
            </div>
          </div>

          {/* PROJECTS */}
          <div
            className="md:col-span-12 p-6 rounded-3xl
            bg-[var(--glass)] border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)]"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs uppercase text-[var(--text-muted)]">
                Projects
              </h3>

              <Link
                href="/projectslist"
                className="text-[var(--accent)]"
              ></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {projects.map((project, i) => (
                <Link
                  key={project.id}
                  href={`/projectslist/${project.id}`}
                  className="p-4 rounded-xl bg-[var(--surface)]
                  border border-[var(--glass-border)]
                  hover:border-[var(--glass-border-hover)]
                  hover:bg-[var(--accent)]/10 transition"
                >
                  <p className="text-[var(--accent)] text-xs font-bold">
                    0{i + 1}
                  </p>

                  <h4 className="font-bold text-sm mt-1 text-[var(--foreground)]">
                    {project.title}
                  </h4>

                  <p className="text-xs text-[var(--text-soft)] mt-1 line-clamp-2">
                    {project.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* TECH STACK */}
          <div
            className="md:col-span-6 p-6 rounded-3xl
            bg-[var(--glass)] border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)]"
          >
            <h3 className="text-xs uppercase text-[var(--text-muted)]">
              Tech Stack
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-2 text-xs text-center rounded-xl
                  bg-[var(--surface)]
                  border border-[var(--glass-border)]
                  text-[var(--text-soft)]
                  hover:bg-[var(--accent)]/10
                  hover:text-[var(--accent)]
                  transition"
                >
                  {skill.skill_name}
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
              href={resume?.file_url}
              target="_blank"
              rel="noopener noreferrer"
              download
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
