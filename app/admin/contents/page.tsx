"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContentsPage() {
  const [landing, setLanding] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

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

  async function saveProfile() {
  try {
    let profileImageUrl = landing.profile_image;

    // Upload new profile image if selected
    if (profileImageFile) {
      const fileExt = profileImageFile.name.split(".").pop();

      const fileName = `profile-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(fileName, profileImageFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("profile-images")
        .getPublicUrl(fileName);

      profileImageUrl = publicUrlData.publicUrl;
    }

    // Update profile
    const { error: profileError } = await supabase
      .from("profile")
      .update({
        heading: landing.heading,
        subheading: landing.subheading,
        about: landing.about,
        email: landing.email,
        github_username: landing.github_username,
        github_link: landing.github_link,
        facebook: landing.facebook,
        fb_link: landing.fb_link,
        phone_number: landing.phone_number,
        avatar_url: landing.avatar_url,
        profile_image: profileImageUrl,
      })
      .eq("id", landing.id);

    if (profileError) throw profileError;

    // Insert new skills
    const newSkills = skills.filter((s) => s.isNew);

    if (newSkills.length) {
      const { error } = await supabase.from("skills").insert(
        newSkills.map((s) => ({
          skill_name: s.skill_name,
        })),
      );

      if (error) throw error;
    }

    // Delete removed skills
    const deletedSkills = skills.filter((s) => s.markedForDelete);

    if (deletedSkills.length) {
      const idsToDelete = deletedSkills.map((s) => s.id);

      const { error } = await supabase
        .from("skills")
        .delete()
        .in("id", idsToDelete);

      if (error) throw error;
    }

    // refresh local state
    setLanding((prev: any) => ({
      ...prev,
      profile_image: profileImageUrl,
    }));

    alert("Profile and skills updated");
  } catch (err) {
    console.error("SAVE ERROR:", err);
    alert("Failed to save");
  }
}

  function addSkill() {
    if (!newSkill.trim()) return;

    setSkills([
      ...skills,
      {
        id: crypto.randomUUID(),
        skill_name: newSkill,
        isNew: true,
      },
    ]);

    setNewSkill("");
  }

  function deleteSkill(id: number | string) {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, markedForDelete: true } : skill,
      ),
    );
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
  {landing.profile_image ? (
    <img
      src={landing.profile_image}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-[var(--text-muted)] text-sm">
      Avatar
    </span>
  )}
</div>

            {/* upload info */}
            <div className="flex-1 space-y-3">
              <h3 className="font-semibold">Profile Photo</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Recommended: 400×400px JPG or PNG
              </p>

               <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProfileImageFile(e.target.files?.[0] || null)
                  }
                  className="px-4 py-2 rounded bg-[var(--accent)] text-black font-semibold hover:bg-[var(--accent-dim)] transition"
                />
            </div>
          </div>
        </Section>

        {/* ── HERO ── */}
        <Section title="Hero Section">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Heading"
              value={landing.heading}
              onChange={(value) =>
                setLanding({
                  ...landing,
                  heading: value,
                })
              }
            />

            <Input
              label="Subheading"
              value={landing.subheading}
              onChange={(value) =>
                setLanding({
                  ...landing,
                  subheading: value,
                })
              }
            />

            <div className="md:col-span-2">
              <Textarea
                label="About Text"
                value={landing.about}
                onChange={(value) =>
                  setLanding({
                    ...landing,
                    about: value,
                  })
                }
              />
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
              {skills
                .filter((skill) => !skill.markedForDelete)
                .map((skill) => (
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
            <Input
              label="Email"
              value={landing.email}
              onChange={(value) =>
                setLanding({
                  ...landing,
                  email: value,
                })
              }
            />
            <Input
              label="GitHub Username"
              value={landing.github_username}
              onChange={(value) =>
                setLanding({
                  ...landing,
                  github_username: value,
                })
              }
            />
            <Input
              label="GitHub Link"
              value={landing.github_link}
              onChange={(value) =>
                setLanding({
                  ...landing,
                  github_link: value,
                })
              }
            />
            <Input
              label="Facebook"
              value={landing.facebook}
              onChange={(value) =>
                setLanding({
                  ...landing,
                  facebook: value,
                })
              }
            />
            <Input
              label="Facebook Link"
              value={landing.fb_link}
              onChange={(value) =>
                setLanding({
                  ...landing,
                  fb_link: value,
                })
              }
            />
            <Input
              label="Phone Number"
              value={landing.phone_number}
              onChange={(value) =>
                setLanding({
                  ...landing,
                  phone_number: value,
                })
              }
            />
          </div>
        </Section>

        {/* ── FOOTER ── */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
          <button className="px-4 py-2 rounded border border-[var(--border)] text-[var(--text-soft)]">
            Cancel
          </button>

          <button
            onClick={saveProfile}
            className="px-5 py-2 rounded bg-[var(--accent)] text-black font-semibold hover:bg-[var(--accent-dim)] transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

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

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-[var(--text-muted)]">{label}</label>

      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded bg-[var(--surface)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-[var(--text-muted)]">{label}</label>

      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full px-4 py-2 rounded bg-[var(--surface)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />
    </div>
  );
}
