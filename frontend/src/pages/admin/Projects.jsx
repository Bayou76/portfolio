import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { api } from "../../services/api";

const empty = {
  title: "",
  description: "",
  url: "",
  technologies: "",
  featured: false,
  order: 0,
};

export default function AdminProjects() {
  const { data: projects, loading } = useFetch(api.getProjects);
  const [list, setList] = useState(null);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const items = list ?? projects;

  const token = localStorage.getItem("admin_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const openCreate = () => {
    setForm(empty);
    setEditing(null);
    setModal(true);
  };
  const openEdit = (p) => {
    setForm({ ...p, technologies: p.technologies?.join(", ") || "" });
    setEditing(p.id);
    setModal(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (editing) {
      const res = await fetch(`/api/projects/${editing}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });
      const updated = await res.json();
      setList(items.map((p) => (p.id === editing ? updated : p)));
    } else {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      const created = await res.json();
      setList([...items, created]);
    }
    setModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce projet ?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE", headers });
    setList(items.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">💼 Projets</h2>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + Ajouter
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Chargement…</p>
      ) : (
        <div className="space-y-3">
          {items.map((p) => (
            <div
              key={p.id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                  {p.description}
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {p.technologies?.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1.5 text-sm bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-lg space-y-4">
            <h3 className="text-xl font-bold text-white">
              {editing ? "Modifier" : "Nouveau"} projet
            </h3>
            <input
              placeholder="Titre"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <textarea
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
            />
            <input
              placeholder="URL (optionnel)"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <input
              placeholder="Technologies (séparées par virgule)"
              value={form.technologies}
              onChange={(e) =>
                setForm({ ...form, technologies: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <label className="flex items-center gap-3 text-gray-300 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
                className="w-4 h-4 accent-purple-500"
              />
              Projet mis en avant (featured)
            </label>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Sauvegarder
              </button>
              <button
                onClick={() => setModal(false)}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
