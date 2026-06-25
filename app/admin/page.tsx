"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [resume, setResume] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  

  async function fetchResume() {
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .maybeSingle();

    if (error) {
      console.error(error);
      return;
    }

    setResume(data);
  }

  useEffect(() => {
    fetchResume();
  }, []);

  async function handleResumeUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    try {
      setUploading(true);

      // Get existing resume
      const { data: existingResume, error: existingError } =
        await supabase
          .from("resumes")
          .select("*")
          .maybeSingle();

      if (existingError) throw existingError;

      // Delete old PDF from storage
      if (existingResume?.file_url) {
        try {
          const oldPath = decodeURIComponent(
            existingResume.file_url.split(
              "/storage/v1/object/public/resumes/"
            )[1]
          );

          if (oldPath) {
            await supabase.storage
              .from("resumes")
              .remove([oldPath]);
          }
        } catch (err) {
          console.error("Error deleting old resume:", err);
        }
      }

      // Upload new PDF
      const filePath = `resume-${Date.now()}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        alert(uploadError.message);
        throw uploadError;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath);

      const resumeData = {
        file_name: file.name,
        file_url: publicUrlData.publicUrl,
        uploaded_at: new Date().toISOString(),
      };

      // Update existing record or create new one
      if (existingResume) {
        const { error } = await supabase
          .from("resumes")
          .update(resumeData)
          .eq("id", existingResume.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("resumes")
          .insert(resumeData);

        if (error) throw error;
      }

      await fetchResume();

      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload resume.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

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
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <h2 className="font-semibold">My Resume</h2>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 rounded bg-[var(--accent)] text-black font-semibold hover:bg-[var(--accent-dim)] transition"
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleResumeUpload}
          />
        </div>

        <div className="p-6 min-h-[200px] flex items-center justify-center text-[var(--text-muted)]">
          {resume ? (
            <iframe
              src={resume.file_url}
              title="Resume Preview"
              className="w-full h-[600px] rounded-lg border border-[var(--border)]"
            />
          ) : (
            <div className="min-h-[200px] flex items-center justify-center text-[var(--text-muted)]">
              No resume uploaded.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
