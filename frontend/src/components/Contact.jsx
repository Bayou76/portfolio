import { useState } from "react";
import { api } from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    content: "",
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.sendMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", content: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-4 text-center">
        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Contact
        </span>
      </h2>
      <p className="text-gray-400 text-center mb-12">
        Une opportunité d'alternance ? Écrivez-moi !
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Votre nom"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors w-full"
          />
          <input
            type="email"
            placeholder="Votre email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors w-full"
          />
        </div>
        <input
          type="text"
          placeholder="Sujet"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors w-full"
        />
        <textarea
          placeholder="Votre message"
          required
          rows={5}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none w-full"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "sending" ? "Envoi…" : "Envoyer le message"}
        </button>
        {status === "success" && (
          <p className="text-center text-green-400 text-sm">
            ✅ Message envoyé !
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-red-400 text-sm">
            ❌ Erreur, réessayez.
          </p>
        )}
      </form>
      <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
        <p>📧 sebia.baya@gmail.com · 📍 Caen (14) · 🚗 Permis B</p>
        <a
          href="https://github.com/Bayou76"
          target="_blank"
          rel="noreferrer"
          className="text-purple-400 hover:text-purple-300 transition-colors mt-2 inline-block"
        >
          github.com/Bayou76 →
        </a>
      </div>
    </section>
  );
}
