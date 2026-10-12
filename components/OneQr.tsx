"use client";

import Image from "next/image";
import { useState } from "react";
import { QrArt } from "@/components/QrArt";

/**
 * "One QR for every wallet", to try: the code on top, every connected wallet in a row under it,
 * and a dotted line from the code down to each. Press a wallet and it becomes the active one,
 * while the code does not change at all. That is the whole claim: the code is yours, and where
 * it pays is whichever wallet you have switched to.
 *
 * The active wallet's line stays dotted and turns blue, with its dots running from the code to
 * the wallet (`.qr-flow`). When the wallet changes, a ring goes out from the code and the newly
 * chosen wallet pops (`.qr-ring`, `.qr-pop`). The line of light on the code is the other phone
 * reading it. All of it is still under reduced motion.
 *
 * The three wallets are three equal columns, so their middles are at 1/6, 1/2 and 5/6 of the
 * width, which is where the lines end (50, 150 and 250 on a 300-wide drawing).
 */
const WALLETS = [
  { name: "Phantom", icon: "/app/ic_wallet_phantom.png", line: "M150,0 C150,20 50,10 50,30" },
  { name: "Seeker", icon: "/app/brand_seeker.png", line: "M150,0 V30" },
  { name: "Solflare", icon: "/app/ic_wallet_solflare.png", line: "M150,0 C150,20 250,10 250,30" },
];

export function OneQr() {
  const [active, setActive] = useState(1);
  // Counts the changes, so the ring can be made afresh (and so play again) on each one.
  const [changes, setChanges] = useState(0);

  const choose = (i: number) => {
    if (i === active) return;
    setActive(i);
    setChanges((c) => c + 1);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative shrink-0">
        {changes > 0 && <span key={changes} aria-hidden className="qr-ring pointer-events-none absolute -inset-1 rounded-[8px]" />}
        <QrArt className="h-[104px] w-[104px]" />
        <div aria-hidden className="scan-line pointer-events-none absolute inset-0">
          <div className="scan-beam absolute inset-x-0 h-[3px] rounded-full bg-blue shadow-[0_0_14px_3px_rgba(0,143,255,0.55)]" />
        </div>
      </div>

      <svg viewBox="0 0 300 30" preserveAspectRatio="none" className="block h-[30px] w-full" fill="none" strokeLinecap="round" aria-hidden>
        {WALLETS.map((w, i) => (
          <path
            key={w.name}
            d={w.line}
            vectorEffect="non-scaling-stroke"
            strokeWidth={i === active ? 2.5 : 2}
            strokeDasharray="1 6"
            className={`transition-[stroke] duration-300 ${i === active ? "qr-flow" : ""}`}
            stroke={i === active ? "#008fff" : "#d3d8df"}
          />
        ))}
      </svg>

      <div role="group" aria-label="Choose the active wallet" className="grid w-full grid-cols-3">
        {WALLETS.map((w, i) => {
          const on = i === active;
          return (
            <div key={w.name} className="px-[3px]">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => choose(i)}
                className={`flex w-full cursor-pointer flex-col items-center gap-1 rounded-[14px] px-1 pb-1.5 pt-2 transition-colors duration-300 ${on ? "qr-pop bg-blue text-white" : "bg-white text-quiet hover:text-ink"}`}
              >
                <Image src={w.icon} alt="" width={48} height={48} className={`h-6 w-6 rounded-full object-cover transition-opacity duration-300 ${on ? "" : "opacity-60"}`} />
                <span className="max-w-full truncate text-[11.5px] font-bold leading-none">{w.name}</span>
                {on && <span className="sr-only">Active</span>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
