import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Component wrapper for scroll animations
interface ScrollAnimateProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
}

export const ScrollAnimate = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
}: ScrollAnimateProps) => {
  const { ref, isVisible } = useScrollAnimation();

  const getAnimationStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
      transitionDelay: `${delay}s`,
    };

    const hiddenStyles: Record<string, React.CSSProperties> = {
      'fade-up': { opacity: 0, transform: 'translateY(40px)' },
      'fade-left': { opacity: 0, transform: 'translateX(-40px)' },
      'fade-right': { opacity: 0, transform: 'translateX(40px)' },
      'scale': { opacity: 0, transform: 'scale(0.9)' },
      'fade': { opacity: 0, transform: 'none' },
    };

    const visibleStyles: React.CSSProperties = {
      opacity: 1,
      transform: 'none',
    };

    return {
      ...baseStyles,
      ...(isVisible ? visibleStyles : hiddenStyles[animation]),
    };
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={getAnimationStyles()}
    >
      {children}
    </div>
  );
};
