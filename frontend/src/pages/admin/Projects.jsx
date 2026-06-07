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
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const items = list ?? projects;

  const openCreate = () => {
    setForm(empty);
    setEditing(null);
    setImageFile(null);
    setPreview(null);
    setModal(true);
  };

  const openEdit = (p) => {
    setForm({ ...p, technologies: p.technologies?.join(", ") || "" });
    setEditing(p.id);
    setPreview(p.image || null);
    setImageFile(null);
    setModal(true);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log("Fichier sélectionné:", file?.name, file?.type);
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("admin_token");
    const headers = { Authorization: `Bearer ${token}` };
    let imagePath = form.image || null;

    try {
      if (imageFile) {
        const imgData = new FormData();
        imgData.append("image", imageFile);
        const imgRes = await fetch("/api/projects/image", {
          method: "POST",
          headers: {
            ...headers,
            Accept: "application/json",
          },
          body: imgData,
        });
        console.log("Image status:", imgRes.status);
        const imgText = await imgRes.text();
        console.log("Image response:", imgText);
        if (imgRes.ok) {
          const imgJson = JSON.parse(imgText);
          imagePath = imgJson.path;
        }
      }

      const payload = {
        title: form.title,
        description: form.description,
        url: form.url || null,
        technologies: form.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        featured: form.featured,
        order: parseInt(form.order) || 0,
        image: imagePath,
      };

      const jsonHeaders = { ...headers, "Content-Type": "application/json" };

      if (editing) {
        const res = await fetch(`/api/projects/${editing}`, {
          method: "PUT",
          headers: jsonHeaders,
          body: JSON.stringify(payload),
        });
        const text = await res.text();
        const updated = JSON.parse(text);
        setList(items.map((p) => (p.id === editing ? updated : p)));
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: jsonHeaders,
          body: JSON.stringify(payload),
        });
        const text = await res.text();
        const created = JSON.parse(text);
        setList([...items, created]);
      }
      setModal(false);
    } catch (err) {
      console.error("Erreur:", err);
      alert("Erreur: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce projet ?")) return;
    const token = localStorage.getItem("admin_token");
    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setList(items.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">💼 Projets</h2>
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
          {items.map((p) => (
            <div
              key={p.id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start"
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-white/10"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-2xl">
                  💼
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                  {p.description}
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {p.technologies?.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
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
              {editing ? "Modifier" : "Nouveau"} projet
            </h3>

            <input
              placeholder="Titre"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
            />

            <textarea
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 resize-none"
            />

            <input
              placeholder="URL du projet"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
            />

            <input
              placeholder="Technologies (séparées par virgule)"
              value={form.technologies}
              onChange={(e) =>
                setForm({ ...form, technologies: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
            />

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Image du projet
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-40 object-cover rounded-xl mb-3 border border-white/10"
                />
              )}
              <label className="flex items-center justify-center gap-3 w-full py-3 bg-white/5 border border-dashed border-white/20 rounded-xl cursor-pointer hover:border-rose-500/50 hover:bg-rose-500/5 transition-all text-gray-400 hover:text-rose-300 text-sm">
                📸 {imageFile ? imageFile.name : "Choisir une image"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Formats acceptés : JPG, PNG, WebP (pas de HEIC)
              </p>
            </div>

            <label className="flex items-center gap-3 text-gray-300 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
                className="w-4 h-4 accent-rose-500"
              />
              Projet mis en avant (featured)
            </label>

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