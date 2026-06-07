import { motion } from "framer-motion";
import { api } from "../services/api";
import { useFetch } from "../hooks/useFetch";

const categories = {
  frontend: {
    label: "Front-end",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-300",
  },
  backend: {
    label: "Back-end",
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-300",
  },
  devops: {
    label: "DevOps",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-300",
  },
  outils: {
    label: "Outils",
    color: "from-red-500 to-orange-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-300",
  },
};

export default function Skills() {
  const { data: skills, loading } = useFetch(api.getSkills);

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="competences" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-rose-400 text-sm font-medium tracking-widest uppercase mb-3">
          Savoir-faire
        </p>
        <h2 className="text-4xl font-black text-white">Compétences</h2>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 bg-white/5 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(grouped).map(([cat, catSkills], gi) => {
            const c = categories[cat] || categories.outils;
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: gi * 0.08 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`${c.bg} border ${c.border} rounded-2xl p-6`}
              >
                <h3
                  className={`text-xs font-bold uppercase tracking-widest mb-6 ${c.text}`}
                >
                  {c.label}
                </h3>
                <div className="space-y-4">
                  {catSkills.map((skill, si) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.25,
                        delay: gi * 0.08 + si * 0.04,
                      }}
                    >
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-200 font-medium">
                          {skill.name}
                        </span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: gi * 0.08 + si * 0.04 + 0.3 }}
                          className={`${c.text} font-semibold`}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            delay: gi * 0.08 + si * 0.04,
                            ease: "easeOut",
                          }}
                          className={`h-full bg-gradient-to-r ${c.color} rounded-full`}
                          style={{
                            backgroundSize: "200% 100%",
                            animation: "shimmer 2s infinite linear",
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
