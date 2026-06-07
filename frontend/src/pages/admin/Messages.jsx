import { useEffect, useState } from "react";
import { BASE_URL } from "../../services/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const token = localStorage.getItem("admin_token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch(BASE_URL + "/api/messages", { headers })
      .then((r) => r.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce message ?")) return;
    await fetch(`${BASE_URL}/api/messages/${id}`, {
      method: "DELETE",
      headers,
    });
    setMessages(messages.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const handleRead = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      await fetch(`${BASE_URL}/api/messages/${msg.id}`, { headers });
      setMessages(
        messages.map((m) => (m.id === msg.id ? { ...m, read: true } : m)),
      );
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-8">✉️ Messages reçus</h2>

      {loading ? (
        <p className="text-gray-400">Chargement…</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-400">Aucun message pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                onClick={() => handleRead(m)}
                className={`bg-white/5 border rounded-xl p-4 cursor-pointer transition-all ${
                  selected?.id === m.id
                    ? "border-purple-500/50 bg-purple-500/10"
                    : "border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p
                      className={`font-medium ${m.read ? "text-gray-300" : "text-white"}`}
                    >
                      {m.name}
                    </p>
                    <p className="text-gray-400 text-sm">{m.email}</p>
                    {m.subject && (
                      <p className="text-gray-500 text-xs mt-1">{m.subject}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!m.read && (
                      <span className="w-2 h-2 bg-purple-400 rounded-full" />
                    )}
                    <span className="text-xs text-gray-500">
                      {m.created_at?.slice(0, 10)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-2 line-clamp-1">
                  {m.content}
                </p>
              </div>
            ))}
          </div>

          {selected && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit sticky top-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-white">{selected.name}</h3>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-purple-400 text-sm hover:underline"
                  >
                    {selected.email}
                  </a>
                </div>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="px-3 py-1.5 text-sm bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20"
                >
                  🗑️
                </button>
              </div>
              {selected.subject && (
                <p className="text-gray-300 font-medium mb-3">
                  {selected.subject}
                </p>
              )}
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {selected.content}
              </p>
              <p className="text-gray-500 text-xs mt-4">
                {selected.created_at?.slice(0, 16).replace("T", " ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
