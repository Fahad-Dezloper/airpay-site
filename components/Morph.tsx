"use client";

import { useSyncExternalStore } from "react";
import { Scrap, type ScrapKind } from "@/components/Art";

/**
 * One drawing that keeps becoming the next, on a ground that does not move: the hero's moving
 * mark from the app's first page, cut down so two of them can stand either side of the headline.
 *
 * The ground is one soft neutral tile and stays exactly as it is. Only what is on it changes:
 * the drawing that is leaving shrinks and turns away a quarter, and the next one turns in from
 * the other side and grows into its place, with its word under it.
 *
 * **Every `Morph` on the page steps on one shared clock, and they take turns.** The clock ticks
 * and only one of them changes: `turn={0}` moves on the odd ticks, `turn={1}` on the even ones,
 * so there is one thing to look at, then the other. Because the order is fixed — left to row N+1,
 * then right to row N+1 — the page can line its two lists up so the pair on screen never shares
 * a drawing or a colour. A clock each would drift through every combination. Still under reduced
 * motion: the first drawing stays.
 */
export type MorphItem = {
  label: string;
  /** The piece drawn on the tile, and its pigment. */
  kind: ScrapKind;
  colour: string;
  /** How much of the tile the piece covers, as a fraction. Default .52. */
  cover?: number;
};

/** Between one change and the next, whichever side it is on. Each side so changes every other one. */
const EVERY = 1600;
const GROUND = "#f1f3f6";

let step = 0;
let timer = 0;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    timer = window.setInterval(() => {
      step += 1;
      listeners.forEach((l) => l());
    }, EVERY);
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      window.clearInterval(timer);
      timer = 0;
    }
  };
}

export function Morph({ items, turn = 0 }: { items: MorphItem[]; turn?: 0 | 1 }) {
  const ticks = useSyncExternalStore(
    subscribe,
    () => step,
    () => 0,
  );
  // Tick 1 moves the first mark, tick 2 the second, tick 3 the first again.
  const turns = Math.floor((ticks + 1 - turn) / 2);
  const n = items.length;
  const which = turns % n;
  const gone = (which + n - 1) % n;

  return (
    <div className="[container-type:inline-size]">
      <div className="relative aspect-square w-full overflow-hidden rounded-[28%]" style={{ background: GROUND }}>
        {items.map((it, i) => {
          // Three places: on the tile; just left it (turned away one way); waiting (turned the other).
          const here = i === which;
          const turn = here ? 0 : i === gone ? -90 : 90;
          return (
            <div
              key={it.label}
              className="absolute inset-0 grid place-items-center transition-[opacity,transform] duration-[560ms] ease-[cubic-bezier(0.3,1.2,0.4,1)]"
              style={{ opacity: here ? 1 : 0, transform: `rotate(${turn}deg) scale(${here ? 1 : 0.4})` }}
            >
              <div className="aspect-square" style={{ width: `${(it.cover ?? 0.52) * 100}%` }}>
                <Scrap kind={it.kind} colour={it.colour} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-[9%] grid place-items-center">
        {items.map((it, i) => (
          <p
            key={it.label}
            className="col-start-1 row-start-1 whitespace-nowrap text-[clamp(14px,9cqw,20px)] font-medium tracking-tight text-ink transition-[opacity,transform] duration-300"
            style={{ opacity: i === which ? 1 : 0, transform: `translateY(${i === which ? 0 : i === (which + 1) % n ? 8 : -8}px)` }}
            aria-hidden={i !== which}
          >
            {it.label}
          </p>
        ))}
      </div>
    </div>
  );
}
