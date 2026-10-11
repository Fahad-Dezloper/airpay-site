import Image from "next/image";

/**
 * The SKR token, large, with two rings of small ones close round it.
 *
 * Put the pointer on it and the coins turn over in order: the big one first, then the inner ring,
 * then the outer. Take the pointer away and they turn back from the outside in. It is all CSS:
 * each layer has one delay for turning over and another for turning back (see `.coins` in
 * globals.css). The big coin has thickness, built from the same disc stacked front to back.
 */
const RINGS = [
  { r: 35, n: 16, pace: "70s", layer: 1 },
  { r: 45.5, n: 22, pace: "95s", layer: 2 },
];
const SLICES = 9;

export function SkrCoins() {
  return (
    <div className="coins relative aspect-square w-[88%] max-w-[350px]" role="img" aria-label="The SKR token with two rings of smaller SKR tokens round it">
      {RINGS.map((ring, k) => (
        <div key={k} className={`skr-ring absolute inset-0 ${k % 2 ? "skr-ring-back" : ""}`} style={{ ["--pace" as string]: ring.pace }} aria-hidden>
          {Array.from({ length: ring.n }, (_, i) => {
            const a = (i / ring.n) * Math.PI * 2;
            return (
              <span
                key={i}
                className="absolute h-[8%] w-[8%] -translate-x-1/2 -translate-y-1/2 [perspective:400px]"
                style={{ left: `${50 + Math.cos(a) * ring.r}%`, top: `${50 + Math.sin(a) * ring.r}%` }}
              >
                <Image src="/app/skr_token.png" alt="" width={64} height={64} className={`coin coin-${ring.layer} h-full w-full`} />
              </span>
            );
          })}
        </div>
      ))}
      <div className="absolute left-1/2 top-1/2 w-[50%] -translate-x-1/2 -translate-y-1/2 [perspective:900px]">
        <div className="coin coin-0 relative aspect-square w-full [transform-style:preserve-3d]">
          {Array.from({ length: SLICES }, (_, i) => (
            <span key={i} aria-hidden className="absolute inset-0 rounded-full bg-[#3a3a3a]" style={{ transform: `translateZ(${(i / (SLICES - 1) - 0.5) * 22}px)` }} />
          ))}
          <Image src="/app/skr_token.png" alt="" width={400} height={400} className="absolute inset-0 h-full w-full rounded-full" style={{ transform: "translateZ(11.5px)" }} />
          <Image src="/app/skr_token.png" alt="" width={400} height={400} className="absolute inset-0 h-full w-full rounded-full" style={{ transform: "translateZ(-11.5px) rotateY(180deg)" }} />
        </div>
      </div>
    </div>
  );
}
