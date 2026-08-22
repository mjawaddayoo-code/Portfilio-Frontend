import { useEffect, useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { href: '#about', label: 'About', id: 'about' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#certificates', label: 'Certificates', id: 'certificates' },
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

const Navbar = ({ name = 'Muhammad Jawad', logoUrl }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/75 backdrop-blur-xl shadow-glass' : 'bg-transparent'
      }`}
    >
      <nav className="container-app flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          {logoUrl ? (
            <img src={logoUrl} alt={`${name} logo`} className="h-8 w-8 rounded-lg object-cover shadow-sm" />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-cta text-white shadow-glow">
              <Terminal className="h-4 w-4" />
            </span>
          )}
          {name.split(' ')[0]}
          <span className="text-gradient">.Jawad</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                active === link.id ? 'text-indigo-600' : 'text-muted hover:text-ink'
              }`}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-indigo-50"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              {link.label}
            </a>
          ))}
          {/* <a href="#contact" className="btn-primary !px-4 !py-2 ml-2 text-sm">
            Let&apos;s talk
          </a> */}
        </div>

        <button
          className="text-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-app flex flex-col gap-1 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active === link.id ? 'bg-indigo-50 text-indigo-600' : 'text-ink hover:bg-canvas'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
