import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[90] flex justify-center py-4 md:py-6 px-4 pointer-events-none">
      <nav
        className={cn(
          'pointer-events-auto flex items-center justify-between px-4 md:px-6 py-3 rounded-full transition-all duration-500 w-[95%] max-w-[800px]',
          scrolled
            ? 'glass-panel shadow-lg'
            : 'bg-transparent border border-transparent'
        )}
      >
        <a
          href="#"
          className={cn(
            'font-bold text-lg md:text-xl tracking-tight shrink-0 transition-colors duration-500',
            scrolled ? 'text-electric-cyan' : 'text-white'
          )}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Pragma
        </a>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={cn(
                  'hover:text-electric-cyan transition-colors duration-300',
                  scrolled ? 'text-white/80' : 'text-white/90'
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 shrink-0">
          <MagneticButton as="a" href="https://wa.me/573124526845" target="_blank" rel="noopener noreferrer">
            <div className="relative overflow-hidden rounded-full group cursor-pointer">
              <span className="absolute inset-0 w-full h-full bg-electric-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <div className="relative flex items-center px-5 py-2.5 bg-electric-cyan rounded-full transition-colors duration-500">
                <span className="relative z-10 font-bold text-sm text-midnight-blue">
                  Hablemos
                </span>
              </div>
            </div>
          </MagneticButton>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'md:hidden p-2 rounded-full transition-colors',
              scrolled ? 'text-electric-cyan' : 'text-white'
            )}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="pointer-events-auto md:hidden absolute top-20 left-4 right-4 glass-card p-6 rounded-3xl">
          <ul className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 hover:text-electric-cyan transition-colors text-lg font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
