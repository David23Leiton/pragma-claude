import { useEffect, useRef, type ReactNode, type ElementType } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  as: Component = 'button',
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, 'x', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });
    const yTo = gsap.quickTo(element, 'y', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const props: Record<string, unknown> = { className, onClick };
  if (href) {
    props.href = href;
    props.target = target;
    props.rel = rel;
  }

  return (
    <div ref={magneticRef} className="inline-block">
      <Component {...props}>{children}</Component>
    </div>
  );
}
