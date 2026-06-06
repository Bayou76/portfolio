import { motion } from 'framer-motion'
import { api } from '../services/api'
import { useFetch } from '../hooks/useFetch'

export default function Experiences() {
  const { data: experiences, loading } = useFetch(api.getExperiences)

  return (
    <section id="experiences" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-16 text-center"
      >
        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Expériences
        </span>
      </motion.h2>

      {loading ? (
        <div className="text-center text-gray-400">Chargement…</div>
      ) : (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-cyan-500" />
          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="pl-12 relative"
              >
                <div className="absolute left-0 top-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <p className="text-purple-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <p>{exp.location}</p>
                      <p>{exp.start_date?.slice(0,7)} → {exp.end_date ? exp.end_date.slice(0,7) : 'Présent'}</p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}