import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CodeProject {
  filename: string;
  code: string;
  outputType: 'clarity' | 'nexus-ecom' | 'zenith' | 'nexus-wash';
}

const PROJECTS: CodeProject[] = [
  {
    filename: 'clarity.system.js',
    code: `// Pragma Digital · Sistema de Gestión Clarity
// Inicializando módulo de afiliaciones...

const cliente = await db.clientes.create({
  nombre: "María González",
  tipo: "Independiente",
  servicios: ["EPS", "ARL", "Pensión"],
});

const proyecto = await afiliaciones.iniciar({
  clienteId: cliente.id,
  tareas: generarTareas(cliente.servicios),
  asignadoA: "funcionario_01",
});

await notificaciones.enviar({
  canal: "general",
  mensaje: \`✓ Proyecto \${proyecto.id} creado\`,
  estado: "activo",
});

// Sistema operativo · Clarity v1.0`,
    outputType: 'clarity',
  },
  {
    filename: 'nexus-ecom.dashboard.js',
    code: `// Pragma Digital · Nexus Ecom Pro
// Sincronizando dashboard de ventas...

const reporte = await metaAds.obtenerMetricas({
  tienda: "Haven Shop",
  periodo: "últimos 30 días",
});

const kpis = calcularKPIs({
  roas: reporte.roas,          // 9.15x
  cpa: reporte.cpa,            // $11,412
  margenNeto: ventas.margen,   // 24%
});

await dashboard.actualizar({
  kpis,
  estado: "live",
});

// Datos en tiempo real · Nexus Ecom Pro v2`,
    outputType: 'nexus-ecom',
  },
  {
    filename: 'zenith.finance.js',
    code: `// Pragma Digital · Zenith Finance
// Calculando plan de libertad financiera...

const plan = await deudas.calcularBolaNieve({
  usuario: "David L.",
  deudas: await cartera.obtenerActivas(),
  metaLibertad: "Mayo 2028",
});

const boveda = await suenos.crear({
  meta: "Automóvil",
  valorObjetivo: 130_000_000,
  ahorreMensual: plan.excedente,
});

// Libertad financiera · Zenith v1.0`,
    outputType: 'zenith',
  },
  {
    filename: 'nexus-wash.erp.js',
    code: `// Pragma Digital · Nexus Wash ERP
// Registrando ingreso de vehículo...

const vehiculo = await patio.registrar({
  placa: "ABC-999",
  tipo: "Automóvil",
  servicio: "Lavado General",
  operario: await operarios.asignarDisponible(),
});

await estados.actualizar(vehiculo.id, "En proceso");

await caja.registrarServicio({
  vehiculo,
  precio: 25000,
});

// ERP Operativo · Nexus Wash v1.0`,
    outputType: 'nexus-wash',
  },
];

function tokenize(line: string) {
  const tokens: { text: string; color: string }[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    // Comments
    const commentMatch = remaining.match(/^(\/\/.*)/);
    if (commentMatch) {
      tokens.push({ text: commentMatch[1], color: '#6b7280' });
      remaining = remaining.slice(commentMatch[1].length);
      continue;
    }

    // Strings (double quotes)
    const doubleStringMatch = remaining.match(/^("(?:[^"\\]|\\.)*")/);
    if (doubleStringMatch) {
      tokens.push({ text: doubleStringMatch[1], color: '#00FF88' });
      remaining = remaining.slice(doubleStringMatch[1].length);
      continue;
    }

    // Template literal
    const templateMatch = remaining.match(/^(`(?:[^`\\]|\\.)*`)/);
    if (templateMatch) {
      tokens.push({ text: templateMatch[1], color: '#00FF88' });
      remaining = remaining.slice(templateMatch[1].length);
      continue;
    }

    // Keywords
    const keywordMatch = remaining.match(/^(const|let|var|await|async|function|return|if|else|new|import|from|export)\b/);
    if (keywordMatch) {
      tokens.push({ text: keywordMatch[1], color: '#00D4FF' });
      remaining = remaining.slice(keywordMatch[1].length);
      continue;
    }

    // Numbers
    const numMatch = remaining.match(/^(\d[\d_,]*\.?\d*)/);
    if (numMatch) {
      tokens.push({ text: numMatch[1], color: '#f59e0b' });
      remaining = remaining.slice(numMatch[1].length);
      continue;
    }

    // Brackets and punctuation
    const punctMatch = remaining.match(/^([{}()[\];,.:=])/);
    if (punctMatch) {
      tokens.push({ text: punctMatch[1], color: '#9ca3af' });
      remaining = remaining.slice(punctMatch[1].length);
      continue;
    }

    // Regular text
    const textMatch = remaining.match(/^([^\s"'`{}()[\];,.:=\/\d]+)/);
    if (textMatch) {
      tokens.push({ text: textMatch[1], color: '#e5e7eb' });
      remaining = remaining.slice(textMatch[1].length);
      continue;
    }

    // Whitespace
    const wsMatch = remaining.match(/^(\s+)/);
    if (wsMatch) {
      tokens.push({ text: wsMatch[1], color: '#e5e7eb' });
      remaining = remaining.slice(wsMatch[1].length);
      continue;
    }

    // Fallback
    tokens.push({ text: remaining[0], color: '#e5e7eb' });
    remaining = remaining.slice(1);
  }

  return tokens;
}

function SyntaxLine({ text }: { text: string }) {
  const tokens = tokenize(text);
  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} style={{ color: token.color }}>
          {token.text}
        </span>
      ))}
    </>
  );
}

// Output panel components
function ClarityOutput({ progress }: { progress: number }) {
  const showName = progress > 0.15;
  const showType = progress > 0.25;
  const showServices = progress > 0.4;
  const showProject = progress > 0.6;

  return (
    <div className="space-y-4">
      <div className="text-xs font-mono text-electric-cyan/50 mb-4">OUTPUT · clarity.system</div>

      {showName && (
        <div className="glass-card p-4 rounded-2xl space-y-3 transition-all duration-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center text-electric-cyan font-bold text-sm">MG</div>
            <div>
              <div className="text-white font-semibold text-sm">María González</div>
              {showType && <div className="text-white/50 text-xs font-mono">Independiente</div>}
            </div>
          </div>

          {showServices && (
            <div className="flex gap-2 flex-wrap">
              {['EPS', 'ARL', 'Pensión'].map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20">
                  {s}
                </span>
              ))}
            </div>
          )}

          {showProject && (
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <div className="w-2 h-2 rounded-full bg-system-green pulse-dot" />
              <span className="text-system-green text-xs font-mono">Proyecto creado · Activo</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NexusEcomOutput({ progress }: { progress: number }) {
  const showRoas = progress > 0.3;
  const showCpa = progress > 0.5;
  const showMargin = progress > 0.65;

  const metrics = [
    { label: 'ROAS', value: '9.15x', show: showRoas, color: '#00D4FF' },
    { label: 'CPA', value: '$11,412', show: showCpa, color: '#00FF88' },
    { label: 'Margen', value: '24%', show: showMargin, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-xs font-mono text-electric-cyan/50 mb-4">OUTPUT · nexus-ecom.dashboard</div>
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="glass-card p-3 rounded-xl text-center transition-all duration-500"
            style={{ opacity: m.show ? 1 : 0.2 }}
          >
            <div className="text-lg md:text-xl font-bold font-mono" style={{ color: m.color }}>
              {m.show ? m.value : '--'}
            </div>
            <div className="text-white/40 text-[10px] font-mono mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {progress > 0.8 && (
        <div className="flex items-center gap-2 justify-center pt-2">
          <div className="w-2 h-2 rounded-full bg-system-green pulse-dot" />
          <span className="text-system-green text-xs font-mono">Dashboard live</span>
        </div>
      )}
    </div>
  );
}

function ZenithOutput({ progress }: { progress: number }) {
  const barProgress = Math.min(progress * 1.2, 1);
  const showBoveda = progress > 0.6;

  return (
    <div className="space-y-4">
      <div className="text-xs font-mono text-electric-cyan/50 mb-4">OUTPUT · zenith.finance</div>

      <div className="glass-card p-4 rounded-2xl space-y-3">
        <div className="text-white/60 text-xs font-mono">Meta: Libertad Financiera</div>
        <div className="text-white font-semibold text-sm">Mayo 2028</div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-electric-cyan to-system-green rounded-full transition-all duration-1000"
            style={{ width: `${barProgress * 100}%` }}
          />
        </div>
        <div className="text-white/40 text-[10px] font-mono text-right">{Math.round(barProgress * 100)}%</div>
      </div>

      {showBoveda && (
        <div className="glass-card p-4 rounded-2xl space-y-2 transition-all duration-500">
          <div className="text-white/60 text-xs font-mono">Bóveda de Sueños</div>
          <div className="text-white font-semibold text-sm">Automóvil</div>
          <div className="text-electric-cyan font-mono text-lg font-bold">$130,000,000</div>
        </div>
      )}
    </div>
  );
}

function NexusWashOutput({ progress }: { progress: number }) {
  const showRow = progress > 0.3;
  const showStatus = progress > 0.6;
  const showCaja = progress > 0.8;

  return (
    <div className="space-y-4">
      <div className="text-xs font-mono text-electric-cyan/50 mb-4">OUTPUT · nexus-wash.erp</div>

      {showRow && (
        <div className="glass-card p-4 rounded-2xl transition-all duration-500">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-white/40 border-b border-white/5">
                <th className="pb-2 font-medium">Placa</th>
                <th className="pb-2 font-medium">Tipo</th>
                <th className="pb-2 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-white/80">
                <td className="py-2 text-electric-cyan font-semibold">ABC-999</td>
                <td className="py-2">Automóvil</td>
                <td className="py-2">
                  {showStatus ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-system-green/10 text-system-green text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-system-green pulse-dot" />
                      En proceso
                    </span>
                  ) : (
                    <span className="text-white/30">--</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {showCaja && (
            <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
              <span className="text-white/40 text-[10px] font-mono">Servicio registrado</span>
              <span className="text-system-green font-mono font-bold text-sm">$25,000</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function LiveCodeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const projectIndexRef = useRef(0);

  const getProgress = useCallback(() => {
    const fullCode = PROJECTS[currentProject]?.code || '';
    if (fullCode.length === 0) return 0;
    return displayedCode.length / fullCode.length;
  }, [currentProject, displayedCode]);

  // Typewriter logic
  useEffect(() => {
    let charIndex = 0;
    const project = PROJECTS[projectIndexRef.current];
    const code = project.code;
    setDisplayedCode('');
    setIsTyping(true);
    setCurrentProject(projectIndexRef.current);

    const typeChar = () => {
      if (charIndex <= code.length) {
        setDisplayedCode(code.slice(0, charIndex));
        charIndex++;
        const delay = code[charIndex - 1] === '\n' ? 80 : 18 + Math.random() * 22;
        typingRef.current = setTimeout(typeChar, delay);
      } else {
        setIsTyping(false);
        // Pause, then transition to next project
        typingRef.current = setTimeout(() => {
          projectIndexRef.current = (projectIndexRef.current + 1) % PROJECTS.length;
          charIndex = 0;
          setDisplayedCode('');
          setIsTyping(true);
          setCurrentProject(projectIndexRef.current);
          typingRef.current = setTimeout(typeChar, 300);
        }, 3000);
      }
    };

    typingRef.current = setTimeout(typeChar, 500);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, []);

  const lines = displayedCode.split('\n');
  const project = PROJECTS[currentProject];
  const progress = getProgress();

  // GSAP fade-in
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
      id="servicios"
      className="relative bg-deep-charcoal py-16 md:py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-[1200px] mx-auto mb-12 md:mb-16 text-center">
        <span className="text-electric-cyan text-[11px] font-mono tracking-widest uppercase mb-6 block">
          {'>'} ASÍ TRABAJAMOS
        </span>
        <h2
          className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          ¿Sigues haciendo manualmente<br />
          lo que un sistema podría<br />
          hacer solo?
        </h2>
        <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-[520px] mx-auto">
          No importa el sector. Si tu operación depende de ti
          para no colapsar, es momento de construir el sistema
          que trabaje contigo.
        </p>
      </div>

      {/* IDE Container */}
      <div className="max-w-[1200px] mx-auto rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0c10] shadow-2xl">
        {/* IDE Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d0f14] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-white/30 text-xs font-mono">{project.filename}</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-system-green pulse-dot" />
            <span className="text-system-green/70 text-[10px] font-mono">live</span>
          </div>
        </div>

        {/* IDE Body - two panels */}
        <div className="flex flex-col md:flex-row">
          {/* Code Panel */}
          <div className="w-full md:w-[60%] p-4 md:p-6 border-r border-white/[0.04] h-[400px] md:h-[480px] overflow-hidden">
            <pre className="text-[11px] md:text-[13px] leading-relaxed font-mono">
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="inline-block w-8 text-right mr-4 text-white/15 select-none shrink-0">
                    {i + 1}
                  </span>
                  <span className="whitespace-pre">
                    <SyntaxLine text={line} />
                  </span>
                </div>
              ))}
              {/* Cursor */}
              <div className="flex">
                <span className="inline-block w-8 text-right mr-4 text-white/15 select-none shrink-0">
                  {lines.length + 1}
                </span>
                <span className="cursor-blink text-electric-cyan font-mono">▌</span>
              </div>
            </pre>
          </div>

          {/* Output Panel */}
          <div className="w-full md:w-[40%] p-4 md:p-6 bg-[#080a0e] h-[300px] md:h-[480px] overflow-hidden">
            {project.outputType === 'clarity' && <ClarityOutput progress={progress} />}
            {project.outputType === 'nexus-ecom' && <NexusEcomOutput progress={progress} />}
            {project.outputType === 'zenith' && <ZenithOutput progress={progress} />}
            {project.outputType === 'nexus-wash' && <NexusWashOutput progress={progress} />}
          </div>
        </div>
      </div>
    </section>
  );
}
