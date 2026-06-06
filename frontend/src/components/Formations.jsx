import { motion } from 'framer-motion'
import { api } from '../services/api'
import { useFetch } from '../hooks/useFetch'

export default function Formations() {
  const { data: formations, loading } = useFetch(api.getFormations)

  return (
    <section id="formations" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-16 text-center"
      >
        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Formations
        </span>
      </motion.h2>

      {loading ? (
        <div className="text-center text-gray-400">Chargement…</div>
      ) : (
        <div className="space-y-6">
          {formations.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-6 items-start hover:bg-white/10 hover:border-purple-500/30 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                🎓
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-semibold text-white">{f.diploma}</h3>
                  <span className="text-sm text-gray-400">
                    {f.year_start}{f.year_end && f.year_end !== f.year_start ? ` — ${f.year_end}` : f.year_end === null ? ' — Présent' : ''}
                  </span>
                </div>
                <p className="text-purple-400 text-sm mt-1">{f.school}</p>
                {f.field && <p className="text-gray-400 text-sm">{f.field}</p>}
                {f.description && <p className="text-gray-300 text-sm mt-2 leading-relaxed">{f.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}