import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  category: string;
  description: string;
  stack: string[];
  animationType: 'nodes' | 'bars' | 'wave' | 'flow';
}

const PROJECTS: Project[] = [
  {
    name: 'Clarity',
    category: 'GESTIÓN · SEGURIDAD SOCIAL',
    description:
      'Plataforma integral para agencias de seguridad social. Automatiza afiliaciones a EPS, ARL, Pensión y Caja desde la captura del cliente hasta la generación de recibos.',
    stack: ['Next.js', 'React', 'Supabase', 'TailwindCSS'],
    animationType: 'nodes',
  },
  {
    name: 'Nexus Ecom Pro',
    category: 'GESTIÓN · E-COMMERCE',
    description:
      'Dashboard unificado para operaciones de e-commerce y dropshipping. Centraliza ventas, publicidad digital, logística y finanzas en tiempo real.',
    stack: ['Next.js', 'React', 'Supabase', 'Meta API', 'TikTok API', 'Shopify'],
    animationType: 'bars',
  },
  {
    name: 'Zenith Finance',
    category: 'APLICACIÓN · FINANZAS PERSONALES',
    description:
      'Aplicación de finanzas personales con enfoque en libertad financiera. Control de ingresos, deudas y metas de ahorro con proyecciones inteligentes.',
    stack: ['Next.js', 'React', 'Supabase', 'Recharts', 'Vercel'],
    animationType: 'wave',
  },
  {
    name: 'Nexus Wash ERP',
    category: 'ERP · SERVICIOS',
    description:
      'Sistema operativo para lavaderos de vehículos. Gestión de servicios, facturación empresarial, nómina y cartera desde un solo panel.',
    stack: ['React', 'Vite', 'Node.js', 'PostgreSQL'],
    animationType: 'flow',
  },
];

// ── SVG Background Animations ──

function NodesAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const circles = svgRef.current.querySelectorAll('.node-circle');
    const ctx = gsap.context(() => {
      circles.forEach((circle, i) => {
        gsap.to(circle, {
          attr: { r: 5 },
          opacity: 0.8,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
          ease: 'sine.inOut',
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const nodes = [
    { x: 60, y: 40 }, { x: 140, y: 70 }, { x: 100, y: 130 },
    { x: 200, y: 50 }, { x: 180, y: 120 }, { x: 250, y: 90 },
    { x: 40, y: 110 }, { x: 280, y: 140 },
  ];

  const edges = [
    [0, 1], [1, 3], [1, 2], [2, 4], [3, 5], [4, 5], [0, 6], [5, 7], [4, 7],
  ];

  return (
    <svg ref={svgRef} viewBox="0 0 320 180" className="w-full h-full opacity-20">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="#00D4FF" strokeWidth="0.8" opacity="0.4"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i} className="node-circle"
          cx={n.x} cy={n.y} r="3"
          fill="#00D4FF" opacity="0.5"
        />
      ))}
    </svg>
  );
}

function BarsAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const bars = svgRef.current.querySelectorAll('.metric-bar');
    const ctx = gsap.context(() => {
      bars.forEach((bar, i) => {
        const baseH = 30 + Math.random() * 80;
        gsap.to(bar, {
          attr: { height: baseH + Math.random() * 40 },
          duration: 1.5 + Math.random(),
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
          ease: 'sine.inOut',
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const barCount = 8;
  const barWidth = 20;
  const gap = 16;

  return (
    <svg ref={svgRef} viewBox="0 0 320 180" className="w-full h-full opacity-20">
      {Array.from({ length: barCount }).map((_, i) => (
        <rect
          key={i}
          className="metric-bar"
          x={30 + i * (barWidth + gap)}
          y={40}
          width={barWidth}
          height={60}
          rx="4"
          fill="#00D4FF"
          opacity="0.5"
        />
      ))}
      {/* Trend line */}
      <path
        d="M30,120 Q80,80 130,100 T230,60 T310,90"
        fill="none"
        stroke="#00D4FF"
        strokeWidth="1.5"
        opacity="0.3"
        strokeDasharray="4,4"
      />
    </svg>
  );
}

function WaveAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const path = svgRef.current.querySelector('.wave-path');
    if (!path) return;
    const ctx = gsap.context(() => {
      gsap.to(path, {
        attr: {
          d: 'M0,90 Q40,50 80,90 T160,90 T240,90 T320,90',
        },
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 320 180" className="w-full h-full opacity-20">
      <path
        className="wave-path"
        d="M0,90 Q40,30 80,90 T160,90 T240,90 T320,90"
        fill="none"
        stroke="#00FF88"
        strokeWidth="2"
        opacity="0.6"
      />
      {/* Glow dot that follows the wave */}
      <circle cx="160" cy="90" r="4" fill="#00FF88" opacity="0.5">
        <animate
          attributeName="cx"
          values="0;320;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function FlowAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const dots = svgRef.current.querySelectorAll('.flow-dot');
    const ctx = gsap.context(() => {
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          rotation: 360,
          transformOrigin: '160px 90px',
          duration: 8 + i * 2,
          repeat: -1,
          ease: 'none',
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const states = ['Ingreso', 'En proceso', 'Listo', 'Entregado'];
  const positions = [
    { x: 160, y: 30 },
    { x: 270, y: 90 },
    { x: 160, y: 150 },
    { x: 50, y: 90 },
  ];

  return (
    <svg ref={svgRef} viewBox="0 0 320 180" className="w-full h-full opacity-20">
      {/* Circular path */}
      <ellipse cx="160" cy="90" rx="100" ry="55" fill="none" stroke="#00D4FF" strokeWidth="0.8" opacity="0.3" />

      {positions.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="6" fill="#00D4FF" opacity="0.5" className="flow-dot" />
          <text x={p.x} y={p.y + 20} textAnchor="middle" fill="#00D4FF" opacity="0.4" fontSize="8" fontFamily="monospace">
            {states[i]}
          </text>
        </g>
      ))}

      {/* Arrow indicator */}
      <circle r="3" fill="#00FF88" opacity="0.8">
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path="M160,30 A100,55 0 0,1 160,150 A100,55 0 0,1 160,30"
        />
      </circle>
    </svg>
  );
}

const ANIM_MAP = {
  nodes: NodesAnimation,
  bars: BarsAnimation,
  wave: WaveAnimation,
  flow: FlowAnimation,
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const AnimComponent = ANIM_MAP[project.animationType];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            cardRef.current,
            { y: 80, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }
          );
        },
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-deep-charcoal border border-white/[0.06] opacity-0"
      style={{ minHeight: 'auto' }}
    >
      {/* SVG Animation Background - hidden on mobile, visible on md+ */}
      <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full pointer-events-none">
        <AnimComponent />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col justify-center h-full max-w-full md:max-w-[60%]">
        <span className="text-electric-cyan text-[10px] md:text-xs font-mono tracking-widest mb-3 md:mb-4">
          {project.category}
        </span>

        <h3 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {project.name}
        </h3>

        <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-[480px]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 sm:px-3 py-1 rounded-lg text-[10px] md:text-xs font-mono bg-white/[0.04] text-white/50 border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="bg-midnight-blue py-16 md:py-28 px-4 md:px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="projects-header mb-10 md:mb-14">
          <h2
            className="text-white text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Algunos de nuestros proyectos
          </h2>
          <p className="text-white/40 text-sm font-mono">
            {'>'} industrias reales · sistemas en producción · código propio
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
