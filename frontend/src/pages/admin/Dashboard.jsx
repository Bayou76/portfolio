import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ projects: 0, experiences: 0, skills: 0, formations: 0, messages: 0 })

  useEffect(() => {
    Promise.all([
      api.getProjects(),
      api.getExperiences(),
      api.getSkills(),
      api.getFormations(),
      fetch('/api/messages', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      }).then(r => r.json()),
    ]).then(([projects, experiences, skills, formations, messages]) => {
      setCounts({
        projects: projects.length,
        experiences: experiences.length,
        skills: skills.length,
        formations: formations.length,
        messages: messages.length,
      })
    })
  }, [])

  const stats = [
    { label: 'Projets',      value: counts.projects,     emoji: '💼', to: '/admin/projects' },
    { label: 'Expériences',  value: counts.experiences,  emoji: '🏢', to: '/admin/experiences' },
    { label: 'Compétences',  value: counts.skills,       emoji: '🛠', to: '/admin/skills' },
    { label: 'Formations',   value: counts.formations,   emoji: '🎓', to: '/admin/formations' },
    { label: 'Messages',     value: counts.messages,     emoji: '✉️', to: '/admin/messages' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white mb-1">Tableau de bord</h2>
        <p className="text-gray-400">Bienvenue Baya — voici l'état de ton portfolio ✨</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map(stat => (
          <button key={stat.label} onClick={() => navigate(stat.to)}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-rose-500/30 hover:bg-rose-500/5 transition-all group">
            <div className="text-3xl mb-3">{stat.emoji}</div>
            <div className="text-4xl font-black bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-gray-400 group-hover:text-rose-300 transition-colors">{stat.label}</div>
          </button>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
        <h3 className="font-semibold text-white mb-4">⚡ Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: '+ Projet',      to: '/admin/projects' },
            { label: '+ Expérience',  to: '/admin/experiences' },
            { label: '+ Compétence',  to: '/admin/skills' },
            { label: '✉️ Messages',   to: '/admin/messages' },
          ].map(action => (
            <button key={action.label} onClick={() => navigate(action.to)}
              className="px-4 py-3 bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-500/20 rounded-xl text-sm text-rose-300 hover:from-rose-500/20 hover:to-orange-500/20 transition-all">
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info portfolio */}
      <div className="bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white mb-1">🌐 Portfolio en ligne</h3>
            <p className="text-sm text-gray-400">Voir le rendu public de ton portfolio</p>
          </div>
          <a href="/" target="_blank"
            className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
            Voir →
          </a>
        </div>
      </div>
    </div>
  )
}