"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id");

      if (error) {
        console.error("Error fetching projects:", error);
        return;
      }

      setProjects(data || []);
    }

    fetchProjects();
  }, []);

  if (projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[var(--background)] text-[var(--foreground)] p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-6">
        Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projectslist/${project.id}`}
            className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] hover:bg-[var(--accent)]/10 transition"
          >
            <h2 className="text-lg font-semibold">
              {project.title}
            </h2>

            <span className="text-xs text-[var(--text-muted)] mt-2 block">
              {project.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}