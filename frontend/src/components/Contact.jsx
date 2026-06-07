import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    content: "",
  });
  const [status, setStatus] = useState(null);
  const [focused, setFocused] = useState(null);

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

  const inputClass = (field) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all ${
      focused === field
        ? "border-rose-500 bg-rose-500/5 shadow-lg shadow-rose-500/10"
        : "border-white/10"
    }`;

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/3 to-transparent pointer-events-none"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-2xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-rose-400 text-sm font-medium tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="text-4xl font-black text-white mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-gray-400">
            Une opportunité d'alternance ? Écrivez-moi !
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              placeholder="Votre nom"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              className={inputClass("name")}
            />
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="email"
              placeholder="Votre email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              className={inputClass("email")}
            />
          </div>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            placeholder="Sujet"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            onFocus={() => setFocused("subject")}
            onBlur={() => setFocused(null)}
            className={inputClass("subject")}
          />
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            placeholder="Votre message"
            required
            rows={5}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            onFocus={() => setFocused("content")}
            onBlur={() => setFocused(null)}
            className={`${inputClass("content")} resize-none`}
          />

          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-rose-500/30 transition-shadow disabled:opacity-50"
          >
            {status === "sending" ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  ⏳
                </motion.span>
                Envoi en cours…
              </span>
            ) : (
              "Envoyer le message ✉️"
            )}
          </motion.button>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-400 text-sm py-2"
            >
              ✅ Message envoyé ! Je vous répondrai rapidement.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-400 text-sm py-2"
            >
              ❌ Une erreur est survenue. Réessayez.
            </motion.p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {[
              {
                href: "mailto:sebia.baya@gmail.com",
                label: "📧 sebia.baya@gmail.com",
              },
              { label: "📍 Caen (14)" },
              { label: "🚗 Permis B" },
            ].map((item, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05, color: "#fb7185" }}
                className={
                  item.href
                    ? "cursor-pointer hover:text-rose-300 transition-colors"
                    : ""
                }
              >
                {item.href ? <a href={item.href}>{item.label}</a> : item.label}
              </motion.span>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <motion.a
              href="https://github.com/Bayou76"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:border-rose-500/40 hover:text-rose-300 transition-all"
            >
              GitHub →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
