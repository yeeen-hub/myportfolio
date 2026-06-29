"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [project, setProject] = useState<any>(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from("projects")
        .select(
          `
          *,
          project_media (*)
        `,
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching project:", error);
        return;
      }

      setProject(data);
    }

    async function fetchSkills() {
      const { data, error } = await supabase
        .from("project_skills")
        .select(
          `
      skill_id,
      skills (
        id,
        skill_name
      )
    `,
        )
        .eq("project_id", id);

      if (error) {
        console.error("Error fetching skills:", error);
        return;
      }

      setSkills(data?.map((item: any) => item.skills).filter(Boolean) || []);
    }

    if (id) {
      fetchProject();
      fetchSkills();
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const media = project.project_media || [];
  const current = media[mediaIndex] || null;

  const next = () => {
    if (media.length <= 1) return;

    setMediaIndex((prev) => (prev + 1) % media.length);
  };

  const prev = () => {
    if (media.length <= 1) return;

    setMediaIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[var(--glass)] border border-[var(--glass-border)] rounded-3xl p-6">
        {/* LEFT: MEDIA VIEWER */}
        <div className="relative bg-[var(--surface)] rounded-xl overflow-hidden border border-[var(--border)]">
          <div className="w-full h-[350px] md:h-[450px] flex items-center justify-center bg-black">
            {!current ? (
              <p className="text-white">No media available</p>
            ) : current.type === "image" ? (
              <img
                src={current.src}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <iframe
                className="w-full h-full"
                src={current.src}
                title="Project Video"
                allowFullScreen
              />
            )}
          </div>

          {media.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-3 py-2 rounded-full"
              >
                ‹
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-3 py-2 rounded-full"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* RIGHT: PROJECT INFO */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-[Audiowide]">
              {project.title}
            </h1>

            {project.link && (
              <a
                href={
    project.link?.startsWith("http")
      ? project.link
      : `https://${project.link}`
  }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] border border-[var(--glass-border)] p-2 rounded-lg hover:bg-[var(--accent)]/10 transition"
              >
                🔗
              </a>
            )}
          </div>

          <span
            className="
            inline-flex self-start w-fit items-center gap-2
            px-3 py-1 rounded-full
            bg-[var(--accent)]/20
            border border-[var(--glass-border)]
            text-[var(--accent)]
            text-xs uppercase tracking-wider font-semibold
          "
          >
            {project.category}
          </span>

          <p className="leading-relaxed">{project.description}</p>

          <p className="text-[var(--text-muted)] uppercase text-xs tracking-wider font-semibold">
            Built with
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-1 text-xs text-center rounded-xl
                  bg-[var(--accent)]/20
                  border border-[var(--glass-border)]
                  text-[var(--text-muted)]"
              >
                {skill.skill_name}
              </div>
            ))}
          </div>

          <hr className="border-[var(--border)]" />

          <button
            onClick={() => router.back()}
            className="mt-4 ml-auto block w-fit px-3 py-2 rounded bg-[var(--surface)] border border-[var(--glass-border)] hover:bg-[var(--accent)]/10 transition"
          >
            ←
          </button>
        </div>
      </div>
    </div>
  );
}
