import type { Metadata } from "next";
import { SCRAPS, Scrap, type ScrapKind } from "@/components/Art";

export const metadata: Metadata = { title: "Art · AirPay", robots: { index: false } };

/**
 * Every scattered piece on one sheet, to look at before it goes on the landing page: each at a
 * working size on white, the whole set small, the set on the brand's blue and on night, and a
 * handful arranged the way the hero arranges them. A test sheet, not a page for visitors.
 */

/** A loose arrangement on soft discs, in the hero's blue and greys. Percentages of the box. */
const SCATTER: { kind: ScrapKind; colour: string; left: string; top: string; size: string; turn: number }[] = [
  { kind: "wallet", colour: "#008fff", left: "32%", top: "38%", size: "30%", turn: -8 },
  { kind: "send", colour: "#008fff", left: "70%", top: "22%", size: "20%", turn: 6 },
  { kind: "tick", colour: "#008fff", left: "84%", top: "52%", size: "15%", turn: 0 },
  { kind: "scan", colour: "#343433", left: "60%", top: "58%", size: "20%", turn: -8 },
  { kind: "card", colour: "#7cc4ff", left: "24%", top: "78%", size: "20%", turn: 8 },
  { kind: "chat", colour: "#343433", left: "52%", top: "86%", size: "15%", turn: -4 },
  { kind: "tap", colour: "#008fff", left: "82%", top: "82%", size: "14%", turn: 0 },
  { kind: "coin", colour: "#ffc53d", left: "50%", top: "14%", size: "12%", turn: -12 },
  { kind: "loading", colour: "#008fff", left: "10%", top: "54%", size: "11%", turn: 0 },
  { kind: "star", colour: "#d3d8df", left: "10%", top: "14%", size: "8%", turn: -8 },
  { kind: "spark", colour: "#7cc4ff", left: "94%", top: "28%", size: "6%", turn: 0 },
];

export default function Art() {
  return (
    <main className="mx-auto max-w-[1080px] px-5 py-12">
      <h1 className="text-[40px] font-bold tracking-[-0.03em]">Art</h1>
      <p className="mt-2 max-w-[520px] text-[17px] leading-[1.5] text-quiet">
        The pieces the landing page scatters. Each takes one pigment and fills the box it is given.
      </p>

      <ul className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6">
        {SCRAPS.map((s) => (
          <li key={s.kind} className="flex flex-col items-center gap-3">
            <div className="grid aspect-square w-full place-items-center rounded-3xl bg-mist">
              <div className="aspect-square w-[58%]">
                <Scrap kind={s.kind} colour={s.colour} />
              </div>
            </div>
            <p className="text-[14px] text-quiet">
              {s.label} <span className="text-ink/40">· {s.kind}</span>
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-[22px] font-bold tracking-tight">Small</h2>
      <div className="mt-4 flex flex-wrap items-center gap-5">
        {SCRAPS.map((s) => (
          <div key={s.kind} className="size-8">
            <Scrap kind={s.kind} colour={s.colour} />
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-[22px] font-bold tracking-tight">On colour</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { ground: "bg-blue", swap: "#ffffff" },
          { ground: "bg-night", swap: null },
        ].map((g) => (
          <div key={g.ground} className={`flex flex-wrap items-center gap-5 rounded-3xl p-6 ${g.ground}`}>
            {SCRAPS.slice(0, 11).map((s) => (
              <div key={s.kind} className="size-12">
                {/* A blue piece on the blue ground would vanish, so there it is drawn in white. */}
                <Scrap kind={s.kind} colour={g.swap && s.colour === "#008fff" ? g.swap : s.kind === "qr" ? "#ffffff" : s.colour} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-[22px] font-bold tracking-tight">Scattered</h2>
      <div className="relative mx-auto mt-4 aspect-square w-full max-w-[520px]">
        <div className="absolute left-[34%] top-[38%] aspect-square w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f1f3f6]" />
        <div className="absolute left-[70%] top-[66%] aspect-square w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f1f3f6]" />
        {SCATTER.map((c, i) => (
          <div key={i} className="absolute aspect-square -translate-x-1/2 -translate-y-1/2" style={{ left: c.left, top: c.top, width: c.size }}>
            <div className="drift h-full w-full" style={{ ["--turn" as string]: `${c.turn}deg`, ["--pace" as string]: `${3 + (i % 4) * 0.4}s`, ["--lag" as string]: `${-i * 0.5}s` }}>
              <Scrap kind={c.kind} colour={c.colour} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
