import { motion } from "framer-motion";
import { api } from "../services/api";
import { useFetch } from "../hooks/useFetch";

export default function Projects() {
  const { data: projects, loading } = useFetch(api.getProjects);

  return (
    <section id="projets" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-rose-400 text-sm font-medium tracking-widest uppercase mb-3">
          Réalisations
        </p>
        <h2 className="text-4xl font-black text-white">Projets notables</h2>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-white/5 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-rose-500/40 hover:bg-rose-500/5 hover:shadow-xl hover:shadow-rose-500/10 transition-all group flex flex-col"
            >
              {project.image ? (
                <div className="h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center text-5xl">
                  💼
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                {project.featured && (
                  <span className="text-xs bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full border border-rose-500/30 mb-3 inline-block w-fit">
                    ⭐ Featured
                  </span>
                )}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                      className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:border-rose-500/30 hover:text-rose-300 transition-colors cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                {project.url && (
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4 }}
                    className="text-sm text-rose-400 hover:text-rose-300 transition-colors font-medium"
                  >
                    Voir le projet →
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}