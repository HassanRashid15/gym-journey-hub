import { useEffect, useRef } from "react";

interface InteractiveBackgroundProps {
  variant?: "particles" | "gradient";
  className?: string;
  density?: number;
  colorHsl?: string; // e.g. "0 95% 55%"
}

/**
 * Lightweight animated background that subtly reacts to mouse movement.
 * - "particles": canvas particles with mouse-attraction + connecting lines
 * - "gradient": animated radial gradient blob that follows the pointer
 *
 * Uses requestAnimationFrame, DPR-aware canvas, pauses when tab hidden,
 * respects prefers-reduced-motion.
 */
const InteractiveBackground = ({
  variant = "particles",
  className = "",
  density = 60,
  colorHsl,
}: InteractiveBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>();

  // Read the primary color from CSS if none provided
  const getColor = () => {
    if (colorHsl) return colorHsl;
    if (typeof window === "undefined") return "0 95% 55%";
    const val = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim();
    return val || "0 95% 55%";
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
      if (gradientRef.current) {
        gradientRef.current.style.setProperty("--mx", `${e.clientX}px`);
        gradientRef.current.style.setProperty("--my", `${e.clientY}px`);
      }
    };
    const onLeave = () => {
      mouse.current.active = false;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    if (variant !== "particles" || reduced) {
      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseleave", onLeave);
      };
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const count = Math.max(20, Math.min(density, 120));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
    }));

    const color = getColor();
    let visible = true;
    const onVis = () => (visible = !document.hidden);
    document.addEventListener("visibilitychange", onVis);

    const rect = () => canvas.getBoundingClientRect();

    const tick = () => {
      if (!visible) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      const bounds = rect();
      const mxLocal = mouse.current.x - bounds.left;
      const myLocal = mouse.current.y - bounds.top;
      const mouseInside =
        mouse.current.active &&
        mxLocal >= 0 &&
        myLocal >= 0 &&
        mxLocal <= width &&
        myLocal <= height;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouseInside) {
          const dx = mxLocal - p.x;
          const dy = myLocal - p.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 140 * 140) {
            const f = (1 - Math.sqrt(dist2) / 140) * 0.6;
            p.x += (dx / Math.sqrt(dist2 + 0.01)) * f;
            p.y += (dy / Math.sqrt(dist2 + 0.01)) * f;
          }
        }

        ctx.beginPath();
        ctx.fillStyle = `hsla(${color} / 0.85)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110) {
            const alpha = (1 - Math.sqrt(d2) / 110) * 0.25;
            ctx.strokeStyle = `hsla(${color} / ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [variant, density, colorHsl]);

  if (variant === "gradient") {
    return (
      <div
        ref={gradientRef}
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        style={{
          background: `
            radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--primary) / 0.25), transparent 60%),
            radial-gradient(800px circle at 80% 20%, hsl(var(--accent) / 0.15), transparent 60%),
            radial-gradient(700px circle at 10% 90%, hsl(var(--primary) / 0.12), transparent 60%)
          `,
          transition: "background-position 0.2s ease-out",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};

export default InteractiveBackground;
