"use client";

import { useEffect, useState } from "react";
import { Scrap, USES, UseArt, type ScrapKind } from "@/components/Art";

/**
 * The middle of the app's first page, running, set straight on the page with no phone round it.
 *
 * One mark in the middle that keeps becoming the next (pay somebody, pay a bill, buy something,
 * earn SKR), the same four small around it, and the scattered pieces drifting. Everything is
 * positioned on a stage 400 units wide, as it is in the app, so the two cannot drift apart by eye.
 *
 * The turn counts up for ever and is never wound back, so going from the fourth to the first is
 * one more quarter turn and not three quarters the wrong way.
 */

type Bit = { x: number; y: number; size: number; kind: ScrapKind; colour: string; turn?: number; pace?: number };

const BITS: Bit[] = [
  // One shield and one gift, facing each other across the mark, and stars in the gaps. Every
  // piece has its mirror on the other side, so the whole thing reads as one arrangement.
  { x: -196, y: -8, size: 54, kind: "shield", colour: "#008fff", turn: -6, pace: 4.3 },
  { x: 196, y: -8, size: 52, kind: "gift", colour: "#ff4f7b", turn: 6, pace: 3.6 },
  { x: 0, y: -208, size: 32, kind: "star", colour: "#ffc53d", pace: 3.0 },
  { x: -72, y: -176, size: 16, kind: "spark", colour: "#ffc53d", pace: 2.6 },
  { x: 72, y: -176, size: 16, kind: "spark", colour: "#ffc53d", pace: 2.9 },
  { x: -206, y: -150, size: 22, kind: "star", colour: "#ffc53d", turn: -8, pace: 3.4 },
  { x: 206, y: -150, size: 22, kind: "star", colour: "#ffc53d", turn: 8, pace: 3.8 },
  { x: -206, y: 150, size: 22, kind: "star", colour: "#ffc53d", turn: 8, pace: 3.2 },
  { x: 206, y: 150, size: 22, kind: "star", colour: "#ffc53d", turn: -8, pace: 3.5 },
];

/** Where the four small ones sit, from the middle: the corners of one rectangle. */
const SMALL: [number, number][] = [
  [-134, -116],
  [134, -116],
  [-134, 104],
  [134, 104],
];

/** A place on the 400-wide stage, as CSS: the stage is 108% as tall as it is wide. */
function at(x: number, y: number, size: number) {
  return {
    left: `${50 + x * 0.25}%`,
    top: `${50 + (y * 0.25) / 1.08}%`,
    width: `${size * 0.25}%`,
  };
}

export function HeroStage() {
  const [turns, setTurns] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTurns((t) => t + 1), 1500);
    return () => window.clearInterval(id);
  }, []);
  const which = turns % USES.length;
  const use = USES[which];

  return (
    <div
      className="relative mx-auto aspect-[1/1.08] w-full max-w-[520px] [container-type:inline-size]"
      role="img"
      aria-label="A mark that changes between the AirPay logo, Pay bills, Pay anyone, Shop and Earn SKR, with the app's small drawings floating round it"
    >
      {/* The stage. */}
      <div className="absolute inset-0">
        {BITS.map((b, i) => (
          <div key={i} className="absolute aspect-square -translate-x-1/2 -translate-y-1/2" style={at(b.x, b.y, b.size)}>
            <div className="pop-in h-full w-full" style={{ ["--lag" as string]: `${0.15 + i * 0.04}s` }}>
              <div
                className="drift h-full w-full"
                style={{ ["--turn" as string]: `${b.turn ?? 0}deg`, ["--pace" as string]: `${b.pace ?? 3.2}s`, ["--lag" as string]: `${-i * 0.37}s` }}
              >
                <Scrap kind={b.kind} colour={b.colour} />
              </div>
            </div>
          </div>
        ))}

        {/* The four, small. Not the app's own mark: that is the middle's alone. */}
        {USES.slice(1).map((u, k) => {
          const i = k + 1;
          return (
          <div key={u.label} className="absolute aspect-square -translate-x-1/2 -translate-y-1/2" style={at(SMALL[k][0], SMALL[k][1], 68)}>
            <div className="pop-in h-full w-full" style={{ ["--lag" as string]: `${0.3 + i * 0.08}s` }}>
              <div
                className="drift grid h-full w-full place-items-center rounded-full"
                style={{ background: u.ground, ["--pace" as string]: `${3.4 + i * 0.5}s`, ["--lag" as string]: `${-i * 0.6}s` }}
              >
                <UseArt index={i} className={i === 4 ? "h-[72%] w-[72%]" : "h-[56%] w-[56%]"} />
              </div>
            </div>
          </div>
          );
        })}

        {/* The one in the middle. */}
        <div className="absolute left-1/2 top-[46%] w-[43%] -translate-x-1/2 -translate-y-1/2">
          <div
            className="grid aspect-square w-full place-items-center transition-[background-color,border-radius,transform,box-shadow] duration-[620ms] ease-[cubic-bezier(0.3,1.35,0.5,1)]"
            style={{
              background: use.ground,
              borderRadius: use.round,
              transform: `rotate(${turns * 90}deg)`,
              boxShadow: `0 18px 36px -10px ${use.ground}88`,
            }}
          >
            {/* Turned back, so the mark stays upright while the shape under it turns. */}
            <div className="relative h-[58%] w-[58%] transition-transform duration-[620ms] ease-[cubic-bezier(0.3,1.35,0.5,1)]" style={{ transform: `rotate(${-turns * 90}deg)` }}>
              {USES.map((u, i) => (
                <div
                  key={u.label}
                  className="absolute inset-0 grid place-items-center transition-[opacity,transform] duration-300 ease-out"
                  style={{ opacity: i === which ? 1 : 0, transform: `scale(${i === which ? (i === 0 || i === 4 ? 1.24 : 1) : 0.5})`, transitionDelay: i === which ? "120ms" : "0ms" }}
                >
                  <UseArt index={i} className="h-full w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-[71.5%] grid w-full place-items-center">
          {USES.map((u, i) => (
            <p
              key={u.label}
              className="col-start-1 row-start-1 rounded-full bg-white px-3 py-0.5 text-[clamp(15px,5.4cqw,21px)] font-bold tracking-tight text-ink transition-[opacity,transform] duration-300"
              style={{ opacity: i === which ? 1 : 0, transform: `translateY(${i === which ? 0 : i === (which + 1) % USES.length ? 8 : -8}px)` }}
              aria-hidden={i !== which}
            >
              {u.label}
            </p>
          ))}
        </div>
      </div>

    </div>
  );
}
