import { motion } from 'framer-motion'
import { api } from '../services/api'
import { useFetch } from '../hooks/useFetch'

const categories = {
  frontend: { label: 'Front-end', color: 'from-purple-500 to-purple-300' },
  backend:  { label: 'Back-end',  color: 'from-cyan-500 to-cyan-300' },
  devops:   { label: 'DevOps',    color: 'from-green-500 to-green-300' },
  outils:   { label: 'Outils',    color: 'from-orange-500 to-orange-300' },
}

export default function Skills() {
  const { data: skills, loading } = useFetch(api.getSkills)

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section id="competences" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-16 text-center"
      >
        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Compétences
        </span>
      </motion.h2>

      {loading ? (
        <div className="text-center text-gray-400">Chargement…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(grouped).map(([cat, catSkills], gi) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 bg-gradient-to-r ${categories[cat]?.color || 'from-gray-400 to-gray-200'} bg-clip-text text-transparent`}>
                {categories[cat]?.label || cat}
              </h3>
              <div className="space-y-4">
                {catSkills.map((skill, si) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.1 + si * 0.08 }}
                  >
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-200">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: gi * 0.1 + si * 0.08, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${categories[cat]?.color || 'from-gray-400 to-gray-200'} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}