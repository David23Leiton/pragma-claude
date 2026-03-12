import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Layers, Rocket, Code, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── Feature 1: Process Timeline ──
const STEPS = [
  { label: 'Descubrimiento', icon: Search },
  { label: 'Arquitectura', icon: Layers },
  { label: 'Desarrollo', icon: Code },
  { label: 'Lanzamiento', icon: Rocket },
];

function ProcessTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          let step = 0;
          const interval = setInterval(() => {
            setActiveStep(step);
            step++;
            if (step >= STEPS.length) {
              clearInterval(interval);
              // Loop restart
              setTimeout(() => {
                setActiveStep(-1);
                setTimeout(() => {
                  let s2 = 0;
                  const interval2 = setInterval(() => {
                    setActiveStep(s2);
                    s2++;
                    if (s2 >= STEPS.length) clearInterval(interval2);
                  }, 600);
                }, 400);
              }, 2000);
            }
          }, 600);
        },
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={timelineRef} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-deep-charcoal/5 h-full flex flex-col">
      <h3 className="text-deep-charcoal font-bold text-lg mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
        Proceso
      </h3>
      <p className="text-deep-charcoal/50 text-sm mb-8">Metodología estructurada en 4 fases</p>

      <div className="relative flex items-center justify-between mt-auto">
        {/* Connection line background */}
        <div className="absolute top-6 left-[10%] right-[10%] h-[2px] bg-deep-charcoal/10 rounded-full" />
        {/* Active fill line */}
        <div
          className="absolute top-6 left-[10%] h-[2px] bg-electric-cyan rounded-full transition-all duration-700 ease-out"
          style={{
            width: activeStep >= 0 ? `${(activeStep / (STEPS.length - 1)) * 80}%` : '0%',
          }}
        />

        {STEPS.map((step, i) => {
          const isActive = i <= activeStep;
          const Icon = step.icon;
          return (
            <div key={step.label} className="relative flex flex-col items-center z-10">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? 'bg-electric-cyan text-midnight-blue shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                    : 'bg-deep-charcoal/5 text-deep-charcoal/30'
                }`}
              >
                <Icon size={20} />
              </div>
              <span
                className={`mt-3 text-[11px] font-mono font-medium transition-colors duration-500 ${
                  isActive ? 'text-deep-charcoal' : 'text-deep-charcoal/30'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Feature 2: Stack Terminal ──
const STACK_LINES = [
  '> Stack: Next.js + React + Supabase',
  '> Integraciones: Meta Ads · TikTok · Shopify',
  '> Deploy: Vercel · Railway · Render',
  '> DB: PostgreSQL · Supabase · Prisma',
];

function StackTerminal() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineRef = useRef(0);

  useEffect(() => {
    let charIdx = 0;

    const typeChar = () => {
      const line = STACK_LINES[lineRef.current];
      if (charIdx <= line.length) {
        setDisplayedText(line.slice(0, charIdx));
        charIdx++;
        typingRef.current = setTimeout(typeChar, 25 + Math.random() * 15);
      } else {
        // Pause, then next line
        typingRef.current = setTimeout(() => {
          lineRef.current = (lineRef.current + 1) % STACK_LINES.length;
          setCurrentLine(lineRef.current);
          charIdx = 0;
          setDisplayedText('');
          typingRef.current = setTimeout(typeChar, 200);
        }, 2500);
      }
    };

    typingRef.current = setTimeout(typeChar, 500);
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, []);

  return (
    <div className="bg-deep-charcoal rounded-3xl p-6 md:p-8 border border-white/[0.06] relative overflow-hidden h-full flex flex-col">
      {/* Live dot */}
      <div className="absolute top-5 right-5 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-system-green pulse-dot" />
        <span className="text-system-green/60 text-[10px] font-mono">live</span>
      </div>

      <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
        Stack tecnológico
      </h3>
      <p className="text-white/40 text-sm mb-6">Tecnologías de producción real</p>

      <div className="bg-[#0a0c10] rounded-xl p-4 min-h-[80px] font-mono text-sm mt-auto">
        <span className="text-electric-cyan">{displayedText}</span>
        <span className="cursor-blink text-electric-cyan ml-0.5">▌</span>
      </div>
    </div>
  );
}

// ── Feature 3: Impacto Real (checklist) ──
const IMPACT_ITEMS = [
  'Soluciones a la medida de tu operación',
  'Tecnología moderna y escalable',
  'Soporte real después del lanzamiento',
];

function ImpactReal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            ref.current?.querySelectorAll('.impact-item') || [],
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' }
          );
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-deep-charcoal/5 h-full flex flex-col">
      <h3 className="text-deep-charcoal font-bold text-lg mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
        Impacto Real
      </h3>
      <p className="text-deep-charcoal/50 text-sm mb-6">
        Cada sistema que entregamos resuelve un problema concreto de negocio.
      </p>

      <div className="w-full h-px bg-deep-charcoal/10 mb-6" />

      <ul className="space-y-5 mt-auto">
        {IMPACT_ITEMS.map((item) => (
          <li key={item} className="impact-item flex items-center gap-3 opacity-0">
            <div className="w-6 h-6 rounded-full bg-electric-cyan/10 flex items-center justify-center shrink-0">
              <CheckCircle size={16} className="text-electric-cyan" />
            </div>
            <span className="text-deep-charcoal text-sm font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-smoke-white py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-14">
          <h2
            className="text-deep-charcoal text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Cómo trabajamos
          </h2>
          <p className="text-deep-charcoal/50 text-sm font-mono">
            {'>'} metodología · herramientas · resultados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div className="feature-card h-full">
            <ProcessTimeline />
          </div>
          <div className="feature-card h-full">
            <StackTerminal />
          </div>
          <div className="feature-card h-full">
            <ImpactReal />
          </div>
        </div>
      </div>
    </section>
  );
}
