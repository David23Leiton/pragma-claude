import { MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-midnight-blue rounded-t-[1.5rem] md:rounded-t-[2.5rem] pt-12 md:pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Left - Brand */}
          <div>
            <h3
              className="text-white text-2xl font-bold mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Pragma Digital
            </h3>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Soluciones digitales que transforman negocios
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-system-green pulse-dot" />
              <span className="text-white/30 text-xs font-mono">
                Sistema operativo · Activo
              </span>
            </div>
          </div>

          {/* Center - Links */}
          <div className="flex flex-col gap-3">
            <span className="text-white/20 text-xs font-mono uppercase tracking-wider mb-2">
              Navegación
            </span>
            {[
              { label: 'Servicios', href: '#servicios' },
              { label: 'Proyectos', href: '#proyectos' },
              { label: 'Nosotros', href: '#nosotros' },
              { label: 'Contacto', href: '#contacto' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/50 hover:text-electric-cyan transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right - Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-white/20 text-xs font-mono uppercase tracking-wider mb-2">
              Contacto
            </span>
            <a
              href="https://wa.me/573124526845"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/50 hover:text-electric-cyan transition-colors text-sm"
            >
              <MessageCircle size={16} />
              <span>312 452 6845</span>
            </a>
            <a
              href="mailto:davidleiton4@gmail.com"
              className="flex items-center gap-3 text-white/50 hover:text-electric-cyan transition-colors text-sm"
            >
              <Mail size={16} />
              <span>davidleiton4@gmail.com</span>
            </a>
            <div className="flex items-center gap-3 text-white/50 text-sm">
              <MapPin size={16} />
              <span>Colombia · 2026</span>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-white/[0.06] pt-6">
          <p className="text-white/20 text-[11px] font-mono text-center">
            {'>'} Pragma Digital · Todos los sistemas operativos · 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
