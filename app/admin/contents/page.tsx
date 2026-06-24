"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContentsPage() {
  const [landing, setLanding] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [newSkill, setNewSkill] = useState("");

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

    fetchProfile();
    fetchSkills();
  }, []);

  async function addSkill() {
    if (!newSkill.trim()) return;

    const { error } = await supabase
      .from("skills")
      .insert({
        skill_name: newSkill,
      });

    if (error) {
      console.error(error);
      return;
    }

    setNewSkill("");

    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("id");

    setSkills(data || []);
  }

  async function deleteSkill(id: number) {
    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  }

  if (!landing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  

  return (
    <div className="flex-1 bg-[var(--background)] text-[var(--foreground)] p-6 md:p-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-[var(--border)] mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
            Admin Panel
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">Edit Contents</h1>

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
              <span className="text-[var(--text-muted)] text-sm">Avatar</span>
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
              <Textarea label="About Text" value={landing.about} />
            </div>
          </div>
        </Section>

        {/* ── EXPERTISE ── */}
        <Section title="My Expertise">
          <div className="mt-8">
  <h2 className="text-xl font-bold mb-4">Skills</h2>

  <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add skill..."
          className="flex-1 border rounded px-4 py-2"
        />

        <button
          onClick={addSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center justify-between border rounded p-3"
          >
            <span>{skill.skill_name}</span>

            <button
              onClick={() => deleteSkill(skill.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
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
