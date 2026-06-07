import { motion } from "framer-motion";
import { api } from "../services/api";
import { useFetch } from "../hooks/useFetch";

export default function Experiences() {
  const { data: experiences, loading } = useFetch(api.getExperiences);

  return (
    <section id="experiences" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-rose-400 text-sm font-medium tracking-widest uppercase mb-3">
          Parcours
        </p>
        <h2 className="text-4xl font-black text-white">Expériences</h2>
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
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500 via-pink-500 to-orange-500" />
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="pl-12 relative group"
              >
                <div className="absolute left-0 top-3 w-8 h-8 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-rose-500/30 transition-all"
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-rose-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <p>{exp.location}</p>
                      <p className="text-xs mt-0.5">
                        {exp.start_date?.slice(0, 7)} →{" "}
                        {exp.end_date ? exp.end_date.slice(0, 7) : "Présent"}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}