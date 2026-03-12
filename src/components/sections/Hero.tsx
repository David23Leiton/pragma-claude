import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MagneticButton from '@/components/ui/MagneticButton';

const TYPEWRITER_TEXT = '> ERPs · CRMs · Aplicaciones Web · Automatizaciones';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        titleRef.current?.querySelectorAll('.title-line') || [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

      tl.fromTo(
        buttonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      if (i <= TYPEWRITER_TEXT.length) {
        setTypedText(TYPEWRITER_TEXT.slice(0, i));
        i++;
        timeoutId = setTimeout(type, 40 + Math.random() * 30);
      }
    };

    const startDelay = setTimeout(() => type(), 1200);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById('proyectos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative h-dvh min-h-[600px] w-full overflow-hidden bg-midnight-blue"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80)',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue via-midnight-blue/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight-blue/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-5 sm:px-6 md:px-16 lg:px-24 pb-20 md:pb-32 max-w-[1400px] mx-auto">
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-6"
        >
          <span className="title-line block text-white opacity-0">
            Soluciones digitales que
          </span>
          <span
            className="title-line block text-electric-cyan opacity-0"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
          >
            transforman negocios
          </span>
        </h1>

        <div ref={subtitleRef} className="opacity-0 mb-10">
          <span
            className="text-electric-cyan/70 text-xs md:text-sm tracking-wide"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span ref={typewriterRef}>{typedText}</span>
            <span className="cursor-blink text-electric-cyan ml-0.5">|</span>
          </span>
        </div>

        <div ref={buttonRef} className="opacity-0">
          <MagneticButton as="button" onClick={scrollToProjects}>
            <div className="relative overflow-hidden rounded-full group cursor-pointer border border-electric-cyan/30 bg-transparent hover:border-electric-cyan/60 transition-colors duration-300">
              <span className="absolute inset-0 w-full h-full bg-electric-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <div className="relative flex items-center px-8 py-3.5">
                <span className="relative z-10 font-semibold text-sm text-white group-hover:text-electric-cyan transition-colors duration-300">
                  Ver nuestro trabajo
                </span>
              </div>
            </div>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
