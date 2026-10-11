"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Scrap, type ScrapKind } from "@/components/Art";

/**
 * The offers, arriving one at a time: an animated list after Magic UI's
 * (magicui.design/docs/components/animated-list), written here in CSS so the site takes on no
 * new package. A new row springs in at the top, the rows under it slide down a place, and the
 * one pushed off the bottom fades out under the card's own colour.
 *
 * The rows are the launch offers the server seeds (`seed.py` in the app's repository), with the
 * SKR each pays. Three of them pay a scratch card, so they say "up to". It goes round the list
 * for ever; under reduced motion it shows the first three and stays put.
 */
type Offer = { what: string; skr: number; upTo?: boolean; kind: ScrapKind; ground: string; colour?: string };

const OFFERS: Offer[] = [
  { what: "Pay a friend by tap", skr: 60, kind: "tap", ground: "#008fff" },
  { what: "Buy any gift card", skr: 200, upTo: true, kind: "card", ground: "#343433" },
  { what: "Pay 3 different people", skr: 250, upTo: true, kind: "send", ground: "#0066cc" },
  { what: "Recharge a phone", skr: 50, kind: "receipt", ground: "#008fff" },
  { what: "Stake 100 SKR or more", skr: 100, kind: "skr", ground: "#e9edf2", colour: "#343433" },
  { what: "Recharge twice this month", skr: 150, upTo: true, kind: "receipt", ground: "#343433" },
  { what: "Swap into USDC on Jupiter", skr: 75, kind: "coin", ground: "#0066cc", colour: "#ffc53d" },
];

const SHOWN = 3;
const ROW = 58;
const GAP = 8;
const EVERY = 1700;

export function OffersList({ fade = "#eef6ff" }: { fade?: string }) {
  // How many rows have arrived so far. It starts full, so the card is never empty.
  const [arrived, setArrived] = useState(SHOWN);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setArrived((n) => n + 1), EVERY);
    return () => window.clearInterval(id);
  }, []);

  // The newest row and the three under it; the last of those is on its way out.
  const rows = Array.from({ length: SHOWN + 1 }, (_, place) => arrived - 1 - place).filter((seq) => seq >= 0);
  return (
    <div
      className="relative w-[252px] overflow-hidden"
      style={{ height: SHOWN * ROW + (SHOWN - 1) * GAP + 22 }}
      role="img"
      aria-label="Offers for verified Seeker owners, each paid in SKR: pay a friend by tap, buy any gift card, pay 3 different people, recharge a phone, stake SKR, and more"
    >
      {rows.map((seq) => {
        const o = OFFERS[seq % OFFERS.length];
        const place = arrived - 1 - seq;
        return (
          <div
            key={seq}
            className="absolute inset-x-[1px] top-[1px] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.3,1.25,0.4,1)]"
            style={{ transform: `translateY(${place * (ROW + GAP)}px)`, opacity: place >= SHOWN ? 0 : 1 }}
          >
            <div
              className={`flex items-center gap-2.5 rounded-[16px] bg-white p-2.5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${seq >= SHOWN ? "list-in" : ""}`}
              style={{ height: ROW }}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-[11px]" style={{ background: o.ground }}>
                <span className={`block aspect-square ${o.kind === "skr" ? "w-[70%]" : "w-[58%]"}`}>
                  <Scrap kind={o.kind} colour={o.colour ?? "#ffffff"} />
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-bold leading-tight">{o.what}</span>
                <span className="mt-1 flex items-center gap-1 text-[12px] font-medium leading-none text-quiet">
                  <Image src="/app/skr_token.png" alt="" width={28} height={28} className="h-3.5 w-3.5 rounded-full" />
                  {o.upTo ? "Up to " : ""}
                  <span className="font-figure font-bold tabular-nums text-ink">{o.skr}</span> SKR
                </span>
              </span>
            </div>
          </div>
        );
      })}
      {/* The card's own colour over the foot, so the row leaving goes out under it. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-9" style={{ background: `linear-gradient(to top, ${fade}, ${fade}00)` }} />
    </div>
  );
}
