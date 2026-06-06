import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const links = [
  { to: "/admin", label: "📊 Dashboard", end: true },
  { to: "/admin/projects", label: "💼 Projets" },
  { to: "/admin/experiences", label: "🏢 Expériences" },
  { to: "/admin/skills", label: "🛠 Compétences" },
  { to: "/admin/formations", label: "🎓 Formations" },
  { to: "/admin/messages", label: "✉️ Messages" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Baya Admin
          </h1>
          <p className="text-xs text-gray-400 mt-1">Panel de gestion</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full px-4 py-2.5 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-left"
          >
            🚪 Déconnexion
          </button>
          <a
            href="/"
            className="block mt-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            ← Voir le portfolio
          </a>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
