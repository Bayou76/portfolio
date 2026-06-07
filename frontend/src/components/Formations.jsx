import { motion } from "framer-motion";
import { api } from "../services/api";
import { useFetch } from "../hooks/useFetch";

export default function Formations() {
  const { data: formations, loading } = useFetch(api.getFormations);

  return (
    <section id="formations" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-rose-400 text-sm font-medium tracking-widest uppercase mb-3">
          Éducation
        </p>
        <h2 className="text-4xl font-black text-white">Formations</h2>
      </motion.div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-white/5 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {formations.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ x: -4, borderColor: "rgba(244,63,94,0.3)" }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-5 items-start transition-colors group"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-12 h-12 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 text-xl shadow-lg shadow-rose-500/20"
              >
                🎓
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap justify-between gap-2 mb-1">
                  <h3 className="font-bold text-white leading-tight group-hover:text-rose-300 transition-colors">
                    {f.diploma}
                  </h3>
                  <span className="text-sm text-gray-400 flex-shrink-0">
                    {f.year_start}
                    {f.year_end && f.year_end !== f.year_start
                      ? ` — ${f.year_end}`
                      : f.year_end === null
                        ? " — Présent"
                        : ""}
                  </span>
                </div>
                <p className="text-rose-400 text-sm font-medium">{f.school}</p>
                {f.field && (
                  <p className="text-gray-400 text-sm mt-0.5">{f.field}</p>
                )}
                {f.description && (
                  <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                    {f.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}