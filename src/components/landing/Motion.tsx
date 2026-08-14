import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Cursor follower: soft glow + ring + dot. Desktop / fine-pointer only. */
export function CursorSpotlight({ className }: { className?: string }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const hover = window.matchMedia("(hover: hover)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !hover || !wide || reduce) return;

    setEnabled(true);

    let raf = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.4;
    // glow lags most, ring lags a bit, dot is snappy
    let gx = targetX;
    let gy = targetY;
    let rx = targetX;
    let ry = targetY;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const dot = dotRef.current;
      if (dot) dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      gx += (targetX - gx) * 0.1;
      gy += (targetY - gy) * 0.1;
      rx += (targetX - rx) * 0.2;
      ry += (targetY - ry) * 0.2;

      const glow = glowRef.current;
      const ring = ringRef.current;
      if (glow) glow.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
      if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-[60] overflow-hidden", className)}
    >
      {/* Big soft glow that lights up content underneath */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl mix-blend-screen will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 60%, transparent) 0%, transparent 68%)",
        }}
      />
      {/* Outer ring — clearly visible follower */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border-2 border-primary/80 will-change-transform"
      />
      {/* Inner dot — snappy, tracks precisely */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_2px_color-mix(in_oklab,var(--primary)_70%,transparent)] will-change-transform"
      />
    </div>
  );
}

/** Fade/slide in when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-base",
        visible && "reveal-in",
        className,
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
