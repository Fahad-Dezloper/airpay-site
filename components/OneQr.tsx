"use client";

import Image from "next/image";
import { useState } from "react";
import { QrArt } from "@/components/QrArt";

/**
 * "One QR for every wallet", to try: one code on the left, every connected wallet on the right,
 * and a line from the code to each. Press a wallet and it becomes the active one — it lights,
 * its line goes solid — while the code does not change at all. That is the whole claim: the
 * code is yours, and where it pays is whichever wallet you have switched to.
 *
 * Each line is drawn twice, a dotted grey one that is always there and a solid blue one on top
 * that fades in for the active wallet, because a dash pattern cannot be faded into a solid line.
 * The line of light on the code is the other phone reading it.
 */
const WALLETS = [
  { name: "Phantom", icon: "/app/ic_wallet_phantom.png", line: "M2,62 C20,62 16,18 34,18" },
  { name: "Seeker", icon: "/app/brand_seeker.png", line: "M2,62 H34" },
  { name: "Solflare", icon: "/app/ic_wallet_solflare.png", line: "M2,62 C20,62 16,106 34,106" },
];

export function OneQr() {
  const [active, setActive] = useState(1);
  return (
    <div className="flex w-full items-center rounded-[24px] bg-white p-3">
      <div className="relative shrink-0 rounded-[16px] p-1.5 shadow-[0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <QrArt className="h-[72px] w-[72px]" />
        <div aria-hidden className="scan-line pointer-events-none absolute inset-1.5">
          <div className="scan-beam absolute inset-x-0 h-[3px] rounded-full bg-blue shadow-[0_0_14px_3px_rgba(0,143,255,0.55)]" />
        </div>
      </div>
      {/* 124 tall, as the three rows beside it are: their middles are at 18, 62 and 106. */}
      <svg viewBox="0 0 36 124" className="h-[124px] w-9 shrink-0" fill="none" strokeLinecap="round" aria-hidden>
        {WALLETS.map((w, i) => (
          <g key={w.name}>
            <path d={w.line} stroke="#d3d8df" strokeWidth="2" strokeDasharray="1 6" />
            <path d={w.line} stroke="#008fff" strokeWidth="2.5" className="transition-opacity duration-300" style={{ opacity: i === active ? 1 : 0 }} />
          </g>
        ))}
      </svg>
      <div role="group" aria-label="Choose the active wallet" className="flex min-w-0 flex-1 flex-col gap-2">
        {WALLETS.map((w, i) => {
          const on = i === active;
          return (
            <button
              key={w.name}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(i)}
              className={`flex h-9 cursor-pointer items-center gap-1.5 rounded-full pl-1.5 pr-2 text-start transition-colors duration-300 ${on ? "bg-blue text-white" : "bg-mist text-quiet hover:text-ink"}`}
            >
              <Image src={w.icon} alt="" width={48} height={48} className={`h-6 w-6 shrink-0 rounded-full object-cover transition-opacity duration-300 ${on ? "" : "opacity-60"}`} />
              <span className="min-w-0 flex-1 truncate text-[12.5px] font-bold leading-none">{w.name}</span>
              {on && <span className="sr-only">Active</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
