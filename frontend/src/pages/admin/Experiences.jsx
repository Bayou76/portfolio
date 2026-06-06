import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { api } from "../../services/api";

const empty = {
  company: "",
  role: "",
  location: "",
  start_date: "",
  end_date: "",
  description: "",
  order: 0,
};

export default function AdminExperiences() {
  const { data: experiences, loading } = useFetch(api.getExperiences);
  const [list, setList] = useState(null);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const items = list ?? experiences;
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
  const openEdit = (e) => {
    setForm(e);
    setEditing(e.id);
    setModal(true);
  };

  const handleSave = async () => {
    if (editing) {
      const res = await fetch(`/api/experiences/${editing}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setList(items.map((e) => (e.id === editing ? updated : e)));
    } else {
      const res = await fetch("/api/experiences", {
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
    await fetch(`/api/experiences/${id}`, { method: "DELETE", headers });
    setList(items.filter((e) => e.id !== id));
  };

  const field = (key, placeholder, type = "text") => (
    <input
      type={type}
      placeholder={placeholder}
      value={form[key] || ""}
      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
    />
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">🏢 Expériences</h2>
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
        <div className="space-y-3">
          {items.map((e) => (
            <div
              key={e.id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between items-start gap-4"
            >
              <div>
                <h3 className="font-semibold text-white">{e.role}</h3>
                <p className="text-purple-400 text-sm">
                  {e.company} · {e.location}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {e.start_date?.slice(0, 7)} →{" "}
                  {e.end_date ? e.end_date.slice(0, 7) : "Présent"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(e)}
                  className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="px-3 py-1.5 text-sm bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20"
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
              {editing ? "Modifier" : "Nouvelle"} expérience
            </h3>
            {field("company", "Entreprise")}
            {field("role", "Poste")}
            {field("location", "Lieu")}
            <div className="grid grid-cols-2 gap-4">
              {field("start_date", "Date début", "date")}
              {field("end_date", "Date fin (vide = présent)", "date")}
            </div>
            <textarea
              placeholder="Description"
              rows={3}
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
            />
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
