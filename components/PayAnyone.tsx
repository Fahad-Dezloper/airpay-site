"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The app's own Pay anyone field, running: the same person under each of the three kinds of
 * name the app can pay — `.skr`, `.sol`, `.air` — one after the other. With each change the
 * registry's mark, the name's ending and the end of the wallet it resolves to change together,
 * and the matching chip under the field lights.
 *
 * The chips are buttons: press one and the field goes to that name and stays there for a
 * while (`HOLD`) before it starts going round again, so a person who chose is not overruled a
 * moment later. It does not go round by itself under reduced motion; the chips still work.
 */
const NAMES = [
  { end: ".skr", wallet: "…q3Fn", mark: "skr" },
  { end: ".sol", wallet: "…9aTk", mark: "sol" },
  { end: ".air", wallet: "…m2Xe", mark: "air" },
] as const;

const EVERY = 2600;
const HOLD = 7000;

/** The plain shadow the site's fields use, and the same with its hairline in blue for the chosen one. */
const SHADOW = "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]";
const SHADOW_ON = "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1.5px_#008fff]";

function RegistryMark({ mark, className }: { mark: (typeof NAMES)[number]["mark"]; className: string }) {
  if (mark === "air") {
    return (
      <span className={`grid place-items-center rounded-full bg-blue ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/mark-on-blue.svg" alt="" className="h-[62%] w-[62%] object-contain" />
      </span>
    );
  }
  return <Image src={mark === "skr" ? "/app/brand_seeker.png" : "/app/id_sol.png"} alt="" width={80} height={80} className={`rounded-full object-cover ${className}`} />;
}

export function PayAnyone() {
  const [which, setWhich] = useState(0);
  // Until when the field stays where a person put it.
  const heldUntil = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (Date.now() < heldUntil.current) return;
      setWhich((w) => (w + 1) % NAMES.length);
    }, EVERY);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-1 flex-col justify-end gap-3">
      <div className={`flex h-[58px] items-center gap-3 rounded-full bg-white pl-2 pr-2 ${SHADOW}`}>
        {/* The three marks on one spot: the one that is leaving shrinks out as the next grows in. */}
        <span className="relative h-[42px] w-[42px] shrink-0">
          {NAMES.map((n, i) => (
            <span
              key={n.end}
              className="absolute inset-0 transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.3,1.2,0.4,1)]"
              style={{ opacity: i === which ? 1 : 0, transform: `scale(${i === which ? 1 : 0.5}) rotate(${i === which ? 0 : -40}deg)` }}
            >
              <RegistryMark mark={n.mark} className="h-full w-full" />
            </span>
          ))}
        </span>
        <span className="min-w-0 flex-1" aria-live="polite">
          <span className="flex text-[16px] font-bold leading-tight">
            dezloper
            {/* Only the ending changes: each one rises into the last one's place. */}
            <span className="relative grid">
              {NAMES.map((n, i) => (
                <span
                  key={n.end}
                  className="col-start-1 row-start-1 text-blue-ink transition-[opacity,transform] duration-300"
                  style={{ opacity: i === which ? 1 : 0, transform: `translateY(${i === which ? 0 : i === (which + 1) % NAMES.length ? 7 : -7}px)` }}
                  aria-hidden={i !== which}
                >
                  {n.end}
                </span>
              ))}
            </span>
          </span>
          <span className="grid font-mono text-[12px] leading-tight text-quiet">
            {NAMES.map((n, i) => (
              <span key={n.end} className="col-start-1 row-start-1 transition-opacity duration-300" style={{ opacity: i === which ? 1 : 0 }} aria-hidden={i !== which}>
                {n.wallet}
              </span>
            ))}
          </span>
        </span>
        <span className="grid h-[42px] place-items-center rounded-full bg-blue px-5 text-[15px] font-bold text-white">Pay</span>
      </div>

      <div role="group" aria-label="Choose a kind of name" className="flex gap-2">
        {NAMES.map((n, i) => {
          const on = i === which;
          return (
            <button
              key={n.end}
              type="button"
              aria-pressed={on}
              onClick={() => {
                heldUntil.current = Date.now() + HOLD;
                setWhich(i);
              }}
              className={`flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-white text-[15px] font-bold transition-[color,box-shadow] duration-300 ${on ? `text-blue-ink ${SHADOW_ON}` : `text-ink ${SHADOW}`}`}
            >
              <RegistryMark mark={n.mark} className="h-6 w-6" />
              {n.end}
            </button>
          );
        })}
      </div>
    </div>
  );
}
