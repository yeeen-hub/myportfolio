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

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          project_media (*)
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching project:", error);
        return;
      }

      setProject(data);
    }

    if (id) {
      fetchProject();
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

    setMediaIndex((prev) =>
      prev === 0 ? media.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
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
            <h1 className="text-2xl font-bold">{project.title}</h1>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                🔗
              </a>
            )}
          </div>

          <span className="text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
            {project.category}
          </span>

          <p className="text-[var(--text-muted)] leading-relaxed">
            {project.description}
          </p>

          <button
            onClick={() => router.back()}
            className="mt-4 w-fit px-4 py-2 rounded bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--accent)]/10 transition"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}