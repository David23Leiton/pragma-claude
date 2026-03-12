import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each manifesto line
      const lines = sectionRef.current?.querySelectorAll('.manifesto-line');
      if (lines) {
        lines.forEach((line, i) => {
          gsap.fromTo(
            line,
            {
              y: 50,
              opacity: 0,
              clipPath: 'inset(0 100% 0 0)',
            },
            {
              y: 0,
              opacity: 1,
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.2,
              delay: i * 0.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                once: true,
              },
            }
          );
        });
      }

      // Animate subtitle
      gsap.fromTo(
        '.manifesto-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        }
      );

      // Animate CTA
      gsap.fromTo(
        '.manifesto-cta',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
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
      id="nosotros"
      className="relative bg-deep-charcoal py-20 md:py-40 px-4 md:px-8 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80)',
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <div className="space-y-4 md:space-y-6 mb-12">
          <p className="manifesto-line text-white/60 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug">
            La mayoría pregunta:
          </p>
          <p
            className="manifesto-line text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            ¿cuánto cuesta un sistema?
          </p>
          <div className="h-3 md:h-4" />
          <p className="manifesto-line text-white/60 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug">
            Nosotros preguntamos:
          </p>
          <p
            className="manifesto-line text-electric-cyan text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            ¿cuánto te está costando no tenerlo?
          </p>
        </div>

        <p
          className="manifesto-subtitle text-white/[0.45] text-base md:text-lg leading-relaxed max-w-[600px] mx-auto mb-14"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
        >
          Cada proyecto comienza con una conversación. Entendemos tu negocio primero. La tecnología viene después.
        </p>

        <div className="manifesto-cta">
          <MagneticButton
            as="a"
            href="https://wa.me/573124526845"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative overflow-hidden rounded-full group cursor-pointer inline-block">
              <span className="absolute inset-0 w-full h-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <div className="relative flex items-center px-7 py-3 md:px-10 md:py-4 bg-electric-cyan rounded-full">
                <span className="relative z-10 font-bold text-sm md:text-base text-midnight-blue group-hover:text-midnight-blue transition-colors duration-500">
                  Hablemos de tu proyecto
                </span>
              </div>
            </div>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
