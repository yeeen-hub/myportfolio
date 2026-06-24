import Link from "next/link";

export default function ProjectsListPage() {
  const projects = [
    {
        title: "Project 1",
        description: "Description of Project 1",
        image: "https://via.placeholder.com/150",
        category: "Web Development",
    }
    ];

    return (
        <div className="flex-1 bg-[var(--background)] text-[var(--foreground)] p-6 md:p-10">
            <h1 className="text-2xl font-bold mb-6">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                href="/projectscontent"
                className="p-4 rounded-xl transition"
                >
                {projects.map((project, index) => (
                    <div key={index} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] hover:bg-[var(--accent)]/10 transition">
                        <img src={project.image} alt={project.title} className="w-full h-auto rounded-lg mb-4" />
                        <h2 className="text-lg font-semibold">{project.title}</h2>
                        <p className="text-sm text-[var(--text-soft)]">{project.description}</p>
                        <span className="text-xs text-[var(--text-muted)] mt-2 block">{project.category}</span>
                    </div>
                ))}
                </Link>
            </div>
        </div>
    );
}