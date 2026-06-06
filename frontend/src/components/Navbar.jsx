export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Baya Sebia
        </span>
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          {[
            "Accueil",
            "Expériences",
            "Compétences",
            "Formations",
            "Projets",
            "Contact",
          ].map((item) => (
            <a
              key={item}
              href={`#${item
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")}`}
              className="hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
