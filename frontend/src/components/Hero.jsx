import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const techs = ['React', 'JavaScript', 'Laravel', 'PHP', 'MySQL', 'Docker', 'Git', 'Figma']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Fond parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-500/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Particules flottantes */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 bg-rose-400/40 rounded-full"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">

        {/* Titre avec effet lettre par lettre */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight"
        >
          <span className="text-white">Baya </span>
          <motion.span
            className="bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            Sebia
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl text-gray-300 font-light mb-6"
        >
          Développeuse Web{' '}
          <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent font-semibold">Full Stack</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Passionnée par React et le développement web, je construis des interfaces modernes et des APIs robustes. En Bachelor CDA au CESI de Caen.
        </motion.p>

        {/* Boutons avec hover animé */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          {[
            { href: '#projets', label: 'Voir mes projets', primary: true },
            { href: '#contact', label: 'Me contacter', primary: false },
          ].map((btn, i) => (
            <motion.a key={btn.href} href={btn.href}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={btn.primary
                ? 'px-8 py-3.5 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full font-semibold shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition-shadow'
                : 'px-8 py-3.5 border border-white/20 rounded-full font-semibold hover:bg-white/10 hover:border-white/40 transition-all'
              }
            >
              {btn.label}
            </motion.a>
          ))}
          <motion.a href="/CV_Baya_Sebia.pdf" download="CV_Baya_Sebia.pdf"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 bg-white/10 border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all"
          >
            📄 Télécharger CV
          </motion.a>
        </motion.div>

        {/* Badges tech avec stagger */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.6 } } }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {techs.map(tech => (
            <motion.span key={tech}
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1 } }}
              whileHover={{ scale: 1.1, y: -3, borderColor: 'rgba(244,63,94,0.5)' }}
              className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:text-rose-300 transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex justify-center">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-rose-400 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}