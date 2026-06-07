import { useState, useEffect } from "react";

const links = [
  "Accueil",
  "Expériences",
  "Compétences",
  "Formations",
  "Projets",
  "Contact",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3" : "py-5"}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <span className="text-xl font-black bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
          BS
        </span>

        {/* Desktop */}
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")}`}
              className="hover:text-white hover:text-rose-300 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="https://github.com/Bayou76"
          target="_blank"
          rel="noreferrer"
          className="hidden md:block px-4 py-1.5 border border-rose-500/40 text-rose-300 text-sm rounded-full hover:bg-rose-500/10 transition-colors"
        >
          GitHub →
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          <div
            className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-white my-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 space-y-3">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")}`}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-rose-300 transition-colors py-1"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
