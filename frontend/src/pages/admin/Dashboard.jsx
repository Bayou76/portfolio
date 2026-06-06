import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    projects: 0,
    experiences: 0,
    skills: 0,
    formations: 0,
    messages: 0,
  });

  useEffect(() => {
    Promise.all([
      api.getProjects(),
      api.getExperiences(),
      api.getSkills(),
      api.getFormations(),
      fetch("/api/messages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }).then((r) => r.json()),
    ]).then(([projects, experiences, skills, formations, messages]) => {
      setCounts({
        projects: projects.length,
        experiences: experiences.length,
        skills: skills.length,
        formations: formations.length,
        messages: messages.length,
      });
    });
  }, []);

  const stats = [
    {
      label: "Projets",
      value: counts.projects,
      color: "from-purple-500 to-purple-300",
      emoji: "💼",
    },
    {
      label: "Expériences",
      value: counts.experiences,
      color: "from-cyan-500 to-cyan-300",
      emoji: "🏢",
    },
    {
      label: "Compétences",
      value: counts.skills,
      color: "from-green-500 to-green-300",
      emoji: "🛠",
    },
    {
      label: "Formations",
      value: counts.formations,
      color: "from-orange-500 to-orange-300",
      emoji: "🎓",
    },
    {
      label: "Messages",
      value: counts.messages,
      color: "from-pink-500 to-pink-300",
      emoji: "✉️",
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-2">Tableau de bord</h2>
      <p className="text-gray-400 mb-8">
        Bienvenue Baya — voici l'état de ton portfolio
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
          >
            <div className="text-3xl mb-2">{stat.emoji}</div>
            <div
              className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
            >
              {stat.value}
            </div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Ajouter un projet", to: "/admin/projects" },
            { label: "Ajouter une expérience", to: "/admin/experiences" },
            { label: "Ajouter une compétence", to: "/admin/skills" },
            { label: "Voir les messages", to: "/admin/messages" },
          ].map((action) => (
            <a
              key={action.label}
              href={action.to}
              className="px-4 py-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-sm text-purple-300 hover:bg-purple-500/20 transition-colors text-center"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
