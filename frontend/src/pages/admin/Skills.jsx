import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { api } from "../../services/api";

const empty = { name: "", category: "frontend", level: 80, order: 0 };

export default function AdminSkills() {
  const { data: skills, loading } = useFetch(api.getSkills);
  const [list, setList] = useState(null);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const items = list ?? skills;
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
  const openEdit = (s) => {
    setForm(s);
    setEditing(s.id);
    setModal(true);
  };

  const handleSave = async () => {
    if (editing) {
      const res = await fetch(`/api/skills/${editing}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setList(items.map((s) => (s.id === editing ? updated : s)));
    } else {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });
      const created = await res.json();
      setList([...items, created]);
    }
    setModal(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE", headers });
    setList(items.filter((s) => s.id !== id));
  };

  const catColors = {
    frontend: "purple",
    backend: "cyan",
    devops: "green",
    outils: "orange",
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">🛠 Compétences</h2>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-sm font-semibold hover:opacity-90"
        >
          + Ajouter
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Chargement…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((s) => (
            <div
              key={s.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">{s.name}</span>
                  <span className="text-sm text-gray-400">{s.level}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1 inline-block">
                  {s.category}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(s)}
                  className="px-2 py-1 text-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="px-2 py-1 text-sm bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20"
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
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold text-white">
              {editing ? "Modifier" : "Nouvelle"} compétence
            </h3>
            <input
              placeholder="Nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="frontend">Front-end</option>
              <option value="backend">Back-end</option>
              <option value="devops">DevOps</option>
              <option value="outils">Outils</option>
            </select>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Niveau : {form.level}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={form.level}
                onChange={(e) =>
                  setForm({ ...form, level: parseInt(e.target.value) })
                }
                className="w-full accent-purple-500"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold hover:opacity-90"
              >
                Sauvegarder
              </button>
              <button
                onClick={() => setModal(false)}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"
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
