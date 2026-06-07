import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { api, BASE_URL } from "../../services/api";

const empty = {
  school: "",
  diploma: "",
  field: "",
  year_start: "",
  year_end: "",
  description: "",
};

export default function AdminFormations() {
  const { data: formations, loading } = useFetch(api.getFormations);
  const [list, setList] = useState(null);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const items = list ?? formations;

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
  const openEdit = (f) => {
    setForm(f);
    setEditing(f.id);
    setModal(true);
  };

  const handleSave = async () => {
    const payload = {
      school: form.school,
      diploma: form.diploma,
      field: form.field || null,
      year_start: parseInt(form.year_start),
      year_end: form.year_end ? parseInt(form.year_end) : null,
      description: form.description || null,
    };

    try {
      if (editing) {
        const res = await fetch(`${BASE_URL}/api/formations/${editing}`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setList(items.map((f) => (f.id === editing ? updated : f)));
      } else {
        const res = await fetch(`${BASE_URL}/api/formations`, {
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
    await fetch(`${BASE_URL}/api/formations/${id}`, {
      method: "DELETE",
      headers: getHeaders(false),
    });
    setList(items.filter((f) => f.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">🎓 Formations</h2>
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
          {items.map((f) => (
            <div
              key={f.id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between items-start gap-4"
            >
              <div>
                <h3 className="font-semibold text-white">{f.diploma}</h3>
                <p className="text-rose-400 text-sm">{f.school}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {f.year_start}
                  {f.year_end ? ` — ${f.year_end}` : " — Présent"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(f)}
                  className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
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
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white">
              {editing ? "Modifier" : "Nouvelle"} formation
            </h3>
            {["school", "diploma", "field"].map((key) => (
              <input
                key={key}
                placeholder={
                  {
                    school: "École",
                    diploma: "Diplôme",
                    field: "Domaine (optionnel)",
                  }[key]
                }
                value={form[key] || ""}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
              />
            ))}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Année début"
                value={form.year_start || ""}
                onChange={(e) =>
                  setForm({ ...form, year_start: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
              />
              <input
                type="number"
                placeholder="Année fin (vide = présent)"
                value={form.year_end || ""}
                onChange={(e) => setForm({ ...form, year_end: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
              />
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