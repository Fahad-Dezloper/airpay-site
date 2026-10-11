"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A border made of moving light, and nothing else: no line, no box. The rays that fall out of
 * the Seeker's beam carry on round whatever this wraps — out along the top edge from its
 * middle, round the corners, down both sides — and run in along the bottom edge to meet in the
 * middle, where they thin out and are gone. Then more come. It never stops.
 *
 * Two mirrored halves, each a few strands a little apart, each strand a run of dashes moving
 * along its line (`.ray-run` in globals.css; still under reduced motion). The lines are real
 * paths measured from the box, so the corners are true quarter circles at any size; they sit
 * `OUT` px outside the box so the light goes round the cards, not over them. A mask fades the
 * strands where the two halves meet. `from="bottom"` turns the whole thing over, for a beam
 * that comes up from underneath.
 */
const OUT = 9;
const STRANDS = [
  { inset: 0, width: 2, dash: "70 180", pace: 3.4, lag: 0, opacity: 0.95 },
  { inset: 4, width: 1.2, dash: "40 210", pace: 2.7, lag: -1.1, opacity: 0.7 },
  { inset: -4, width: 1.2, dash: "55 195", pace: 4.1, lag: -2.3, opacity: 0.6 },
  { inset: 0, width: 1, dash: "18 232", pace: 2.2, lag: -0.6, opacity: 0.9 },
];

/** Half the border: from the middle of the top edge, round one side, to the middle of the bottom. */
function half(w: number, h: number, r: number, inset: number, side: 1 | -1) {
  const x0 = inset, y0 = inset, x1 = w - inset, y1 = h - inset, rr = Math.max(2, r - inset), mid = w / 2;
  return side === 1
    ? `M${mid},${y0} H${x1 - rr} A${rr},${rr} 0 0 1 ${x1},${y0 + rr} V${y1 - rr} A${rr},${rr} 0 0 1 ${x1 - rr},${y1} H${mid}`
    : `M${mid},${y0} H${x0 + rr} A${rr},${rr} 0 0 0 ${x0},${y0 + rr} V${y1 - rr} A${rr},${rr} 0 0 0 ${x0 + rr},${y1} H${mid}`;
}

export function RayBorder({ children, radius = 26, from = "top", className = "" }: { children: ReactNode; radius?: number; from?: "top" | "bottom"; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth + OUT * 2, h: el.offsetHeight + OUT * 2 });
    measure();
    const seen = new ResizeObserver(measure);
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  // Gone where the halves meet: clear at the middle of the far edge, full a little way out from it.
  const fade = "radial-gradient(ellipse 16% 90px at 50% 100%, transparent 0%, transparent 18%, #000 100%)";
  return (
    <div ref={box} className={`relative ${className}`}>
      {size && (
        <svg
          aria-hidden
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          className="pointer-events-none absolute overflow-visible"
          style={{
            left: -OUT,
            top: -OUT,
            transform: from === "bottom" ? "scaleY(-1)" : undefined,
            maskImage: fade,
            WebkitMaskImage: fade,
            filter: "drop-shadow(0 0 5px rgba(31,195,211,0.55))",
          }}
          fill="none"
          stroke="#1fc3d3"
          strokeLinecap="round"
        >
          {([1, -1] as const).map((side) =>
            STRANDS.map((s, i) => (
              <path
                key={`${side}${i}`}
                d={half(size.w, size.h, radius + OUT, 2 + s.inset + 4, side)}
                pathLength={1000}
                className="ray-run"
                strokeWidth={s.width}
                strokeOpacity={s.opacity}
                strokeDasharray={s.dash}
                style={{ animationDuration: `${s.pace}s`, animationDelay: `${s.lag}s` }}
              />
            )),
          )}
        </svg>
      )}
      {children}
    </div>
  );
}
