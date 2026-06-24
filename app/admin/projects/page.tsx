"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mediaIndexes, setMediaIndexes] = useState<{
  [key: number]: number;
  }>({});

  async function fetchProjects() {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select(
        `
        *,
        project_media (
          id,
          type,
          src
        )
      `,
      )
      .order("id");

    if (error) {
      console.error(error);
    } else {
      setProjects(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  function openNewProjectModal() {
    setEditingId(null);
    setTitle("");
    setCategory("");
    setDescription("");
    setOpen(true);
  }

  function openEditModal(project: any) {
    setEditingId(project.id);
    setTitle(project.title || "");
    setCategory(project.category || "");
    setDescription(project.description || "");
    setOpen(true);
  }

  function openDeleteModal(project: any) {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      supabase
        .from("projects")
        .delete()
        .eq("id", project.id)
        .then(({ error }) => {
          if (error) {
            console.error(error);
          } else {
            fetchProjects();
          }
        });
    }
  }

  async function handleSave() {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("projects")
        .update({
          title,
          category,
          description,
        })
        .eq("id", editingId);

      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase.from("projects").insert({
        title,
        category,
        description,
      });

      if (error) {
        console.error(error);
        return;
      }
    }

    setOpen(false);
    fetchProjects();
  }

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
          onClick={openNewProjectModal}
          className="flex items-center gap-2 px-4 py-2 rounded bg-[var(--accent)] text-black font-semibold hover:bg-[var(--accent-dim)] transition"
        >
          + New Project
        </button>
      </div>

      {/* COUNT */}
      <div className="flex items-center gap-2 mb-4 text-sm text-[var(--text-muted)]">
        <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
        {projects.length} project(s) in portfolio
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-[var(--text-muted)] border border-[var(--border)] rounded-xl bg-[var(--surface)]">
          No projects yet
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-start justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40 transition"
            >
              {/* LEFT SIDE */}
              <div className="flex gap-4 flex-1">
                {/* MEDIA PREVIEW */}
                {/* MEDIA PREVIEW */}
                <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--surface)] flex-shrink-0">
                  {project.project_media?.length ? (
                    <>
                      {project.project_media[mediaIndexes[project.id] || 0]
                        ?.type === "video" ? (
                        <video
                          src={
                            project.project_media[mediaIndexes[project.id] || 0]
                              ?.src
                          }
                          className="w-full h-full object-cover"
                          muted
                        />
                      ) : (
                        <img
                          src={
                            project.project_media[mediaIndexes[project.id] || 0]
                              ?.src
                          }
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* PREV BUTTON */}
                      {project.project_media.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setMediaIndexes((prev) => ({
                              ...prev,
                              [project.id]:
                                ((prev[project.id] || 0) -
                                  1 +
                                  project.project_media.length) %
                                project.project_media.length,
                            }))
                          }
                          className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 text-white text-sm"
                        >
                          ◀
                        </button>
                      )}

                      {/* NEXT BUTTON */}
                      {project.project_media.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setMediaIndexes((prev) => ({
                              ...prev,
                              [project.id]:
                                ((prev[project.id] || 0) + 1) %
                                project.project_media.length,
                            }))
                          }
                          className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 text-white text-sm"
                        >
                          ▶
                        </button>
                      )}

                      {/* COUNTER */}
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px]">
                        {(mediaIndexes[project.id] || 0) + 1}/
                        {project.project_media.length}
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[var(--text-muted)]">
                      No Media
                    </div>
                  )}
                </div>

                {/* PROJECT INFO */}
                <div className="flex-1">
                  <div className="text-xs text-[var(--accent)] font-semibold">
                    {project.category}
                  </div>

                  <div className="font-semibold">{project.title}</div>

                  <div className="text-sm text-[var(--text-muted)]">
                    {project.description}
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => openEditModal(project)}
                  className="px-3 py-1 text-sm rounded border border-[var(--border)] hover:border-[var(--accent)] transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => openDeleteModal(project)}
                  className="px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg rounded-xl bg-[var(--background)] border border-[var(--border)] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">
                {editingId ? "Edit Project" : "New Project"}
              </h2>
            </div>

            <div className="space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-3 py-2 rounded bg-[var(--surface)] border border-[var(--border)]"
              />

              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="w-full px-3 py-2 rounded bg-[var(--surface)] border border-[var(--border)]"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={5}
                className="w-full px-3 py-2 rounded bg-[var(--surface)] border border-[var(--border)]"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded border border-[var(--border)]"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-3 py-2 rounded bg-[var(--accent)] text-black font-semibold"
              >
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
