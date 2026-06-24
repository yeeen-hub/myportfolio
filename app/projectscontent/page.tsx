"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsListPage() {
  const router = useRouter();

  const projects = [
    {
      title: "Project 1",
      description: "Description of Project 1",
      link: "https://example.com/project1",
      category: "Web Development",
      media: [
        { type: "image", src: "https://via.placeholder.com/600x400" },
        { type: "video", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { type: "image", src: "https://via.placeholder.com/600x400/0000ff" },
      ],
    },
  ];

  const [index, setIndex] = useState(0);

  const project = projects[0];
  const current = project.media[index];

  const next = () => {
    setIndex((prev) => (prev + 1) % project.media.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? project.media.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-6">
      
      {/* MAIN CARD */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT: MEDIA VIEWER */}
        <div className="relative bg-[var(--surface)] rounded-xl overflow-hidden border border-[var(--border)]">
          
          {/* Media */}
          <div className="w-full h-[350px] md:h-[450px] flex items-center justify-center bg-black">
            {current.type === "image" ? (
              <img
                src={current.src}
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

          {/* Arrows */}
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
        </div>

        {/* RIGHT: INFO */}
        <div className="flex flex-col gap-4">

          {/* Title + Link */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{project.title}</h1>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              🔗
            </a>
          </div>

          {/* Category */}
          <span className="text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
            {project.category}
          </span>

          {/* Description */}
          <p className="text-[var(--text-muted)] leading-relaxed">
            {project.description}
          </p>

          {/* Back Button */}
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