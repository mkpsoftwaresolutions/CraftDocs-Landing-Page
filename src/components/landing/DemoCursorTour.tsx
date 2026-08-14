import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CursorStep = {
  x: number;
  y: number;
  label?: string;
  click?: boolean;
  hold?: number;
};

/** Guided fake cursor that smoothly tours a demo panel. */
export function DemoCursorTour({
  steps,
  className,
  active = true,
}: {
  steps: CursorStep[];
  className?: string;
  active?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active || steps.length === 0) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    setVisible(true);
    setIndex(0);
    setClicking(false);

    let cancelled = false;

    const run = async () => {
      // Small delay so the panel mounts before the cursor starts moving.
      await wait(400);
      while (!cancelled) {
        for (let i = 0; i < steps.length; i += 1) {
          if (cancelled) return;
          setIndex(i);
          setClicking(false);
          await wait(steps[i].hold ?? 1500);
          if (cancelled) return;
          if (steps[i].click) {
            setClicking(true);
            await wait(280);
            if (cancelled) return;
            setClicking(false);
            await wait(350);
          }
        }
        await wait(600);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [active, steps]);

  if (!visible) return null;
  const step = steps[index] ?? steps[0];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-30 overflow-hidden", className)}
    >
      {/* Soft trail / glow under the cursor */}
      <div
        className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-md transition-[left,top] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ left: `${step.x}%`, top: `${step.y}%` }}
      />

      <div
        className="absolute transition-[left,top] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[left,top]"
        style={{ left: `${step.x}%`, top: `${step.y}%` }}
      >
        <div
          className="relative transition-transform duration-200"
          style={{
            transform: clicking
              ? "translate(-18%, -8%) scale(0.82)"
              : "translate(-18%, -8%) scale(1)",
          }}
        >
          {/* High-contrast OS-style cursor */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
          >
            <path
              d="M4.8 2.6 19.2 11c.75.44.4 1.55-.5 1.55h-5.6l-2.55 7.55c-.24.72-1.28.7-1.48-.04L4.8 2.6Z"
              fill="#F8FAFC"
              stroke="#0F172A"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>

          {step.label ? (
            <div className="absolute left-6 top-5 whitespace-nowrap rounded-full bg-slate-950 px-2.5 py-1 text-[10px] font-bold text-white shadow-xl ring-1 ring-white/15">
              {step.label}
            </div>
          ) : null}

          {clicking ? (
            <span className="absolute left-1.5 top-1.5 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-400 animate-cursor-ping" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
