import { motion } from 'framer-motion'
import { api } from '../services/api'
import { useFetch } from '../hooks/useFetch'

export default function Projects() {
  const { data: projects, loading } = useFetch(api.getProjects)

  return (
    <section id="projets" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-16 text-center"
      >
        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Projets notables
        </span>
      </motion.h2>

      {loading ? (
        <div className="text-center text-gray-400">Chargement…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/30 transition-colors group cursor-default"
            >
              {project.featured && (
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30 mb-4 inline-block">
                  ⭐ Featured
                </span>
              )}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.map(tech => (
                  <span key={tech} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
              {project.url && (
                <a href={project.url} target="_blank" rel="noreferrer"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Voir le projet →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}