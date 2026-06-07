import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { api, BASE_URL } from "../../services/api";

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

  const getHeaders = (json = true) => {
    const token = localStorage.getItem("admin_token");
    const h = { Authorization: `Bearer ${token}`, Accept: "application/json" };
    if (json) h["Content-Type"] = "application/json";
    return h;
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
    const payload = {
      company: form.company,
      role: form.role,
      location: form.location || null,
      start_date: form.start_date,
      end_date: form.end_date || null,
      description: form.description || null,
      order: parseInt(form.order) || 0,
    };

    try {
      if (editing) {
        const res = await fetch(`${BASE_URL}/api/experiences/${editing}`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setList(items.map((e) => (e.id === editing ? updated : e)));
      } else {
        const res = await fetch(`${BASE_URL}/api/experiences`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setList([...items, created]);
      }
      setModal(false);
    } catch (err) {
      console.error("Erreur:", err);
      alert("Erreur: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ?")) return;
    await fetch(`${BASE_URL}/api/experiences/${id}`, {
      method: "DELETE",
      headers: getHeaders(false),
    });
    setList(items.filter((e) => e.id !== id));
  };

  const field = (key, placeholder, type = "text") => (
    <input
      type={type}
      placeholder={placeholder}
      value={form[key] || ""}
      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
    />
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">🏢 Expériences</h2>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl text-sm font-semibold hover:opacity-90"
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
                <p className="text-rose-400 text-sm">
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 resize-none"
            />
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl font-semibold hover:opacity-90"
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
