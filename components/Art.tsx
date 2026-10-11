import Image from "next/image";

/**
 * The drawings from the app's first page, redrawn in SVG from the same shapes
 * (tap/.../Landing.kt): the four things AirPay is for, and the small pieces scattered round them.
 *
 * The colours of the scattered pieces are illustration pigments, as they are in the app.
 */

export const USES = [
  // The app itself comes first, as its own icon. Then the four things it is for. Pay bills
  // follows the logo, not Pay anyone: those two are both white on the same blue, and no two
  // neighbours here share a colour, round the loop included.
  { label: "AirPay", ground: "#008fff", round: "50%", art: "logo" },
  { label: "Pay bills", ground: "#14b866", round: "50%", art: "bill" },
  { label: "Pay anyone", ground: "#008fff", round: "50%", art: "plane" },
  { label: "Shop", ground: "#ff6a2b", round: "50%", art: "bag" },
  { label: "Earn SKR", ground: "#343433", round: "50%", art: "skr" },
] as const;

/** One of the four, drawn in white on its own colour. Fills the box it is given. */
export function UseArt({ index, className = "" }: { index: number; className?: string }) {
  const { ground, art } = USES[index];
  if (art === "logo") {
    // The brand's mark in its on-blue tone, from the kit's own file.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/brand/mark-on-blue.svg" alt="" className={`object-contain ${className}`} />;
  }
  if (art === "skr") {
    return <Image src="/app/skr_token.png" alt="" width={320} height={320} className={className} />;
  }
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden>
      {art === "plane" && (
        // A paper plane, nose up and to the right, the under wing in shade.
        <g strokeLinejoin="round" strokeWidth="10">
          <polygon points="96,-90 10,98 -16,22" fill="#cde7ff" stroke="#cde7ff" />
          <polygon points="96,-90 -98,-12 -16,22" fill="#ffffff" stroke="#ffffff" />
        </g>
      )}
      {art === "bill" && (
        // A bill with a torn foot and three lines of print, and a coin on its corner.
        <g>
          <path
            d="M-86,-74 Q-86,-92 -68,-92 L42,-92 Q60,-92 60,-74 L60,90 L35.7,72 L11.3,90 L-13,72 L-37.3,90 L-61.7,72 L-86,90 Z"
            fill="#ffffff"
          />
          <g stroke={ground} strokeWidth="13" strokeLinecap="round">
            <line x1="-58" y1="-54" x2="32" y2="-54" />
            <line x1="-58" y1="-20" x2="32" y2="-20" />
            <line x1="-58" y1="14" x2="-10" y2="14" />
          </g>
          <circle cx="60" cy="50" r="50" fill={ground} />
          <circle cx="60" cy="50" r="42" fill="#e9a51c" />
          <circle cx="60" cy="50" r="34" fill="#ffc53d" />
          <line x1="50" y1="36" x2="46" y2="56" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="7" strokeLinecap="round" />
        </g>
      )}
      {art === "bag" && (
        // A shopping bag: the body, its handle, and a smile in the disc's own colour.
        <g fill="none" strokeLinecap="round">
          <path d="M-42,-42 A42,45 0 0 1 42,-42" stroke="#ffffff" strokeWidth="15" />
          <rect x="-80" y="-42" width="160" height="136" rx="24" fill="#ffffff" />
          <path d="M-36,8 A40,35 0 0 0 36,8" stroke={ground} strokeWidth="14" />
        </g>
      )}
    </svg>
  );
}

export type ScrapKind = "star" | "spark" | "coin" | "arrow" | "heart" | "shield" | "flower" | "lock" | "gift" | "wallet" | "bag" | "skr";

/** One scattered piece. Fills the box it is given; `colour` is its main pigment. */
export function Scrap({ kind, colour }: { kind: ScrapKind; colour: string }) {
  return (
    <svg viewBox="-100 -100 200 200" className="h-full w-full overflow-visible" aria-hidden>
      {(kind === "star" || kind === "spark") && (
        <path
          d={
            kind === "star"
              ? "M0,-100 L30,-30 L100,0 L30,30 L0,100 L-30,30 L-100,0 L-30,-30 Z"
              : "M0,-100 L18,-18 L100,0 L18,18 L0,100 L-18,18 L-100,0 L-18,-18 Z"
          }
          fill={colour}
          stroke={colour}
          strokeWidth="26"
          strokeLinejoin="round"
        />
      )}
      {kind === "coin" && (
        <g>
          <circle r="100" fill="#e9a51c" />
          <circle r="82" fill={colour} />
          <circle r="50" fill="none" stroke="#ffe08a" strokeWidth="14" />
          <line x1="-50" y1="-36" x2="-30" y2="-56" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="14" strokeLinecap="round" />
        </g>
      )}
      {kind === "arrow" && (
        <g stroke={colour} strokeWidth="42" strokeLinecap="round" fill="none">
          <line x1="-80" y1="0" x2="70" y2="0" />
          <line x1="70" y1="0" x2="5" y2="-62" />
          <line x1="70" y1="0" x2="5" y2="62" />
        </g>
      )}
      {kind === "heart" && (
        <g>
          <path d="M0,85 C-150,-10 -70,-125 0,-40 C70,-125 150,-10 0,85 Z" fill={colour} />
          <circle cx="-42" cy="-42" r="14" fill="#ffffff" fillOpacity="0.45" />
        </g>
      )}
      {kind === "shield" && (
        // A shield as on a coat of arms: one half in shade, a paler line set in, the tick on top.
        <g>
          <path
            d="M0,-98 Q42,-70 86,-72 C92,20 56,74 0,100 C-56,74 -92,20 -86,-72 Q-42,-70 0,-98 Z"
            fill={colour}
          />
          <path d="M0,-98 Q42,-70 86,-72 C92,20 56,74 0,100 Z" fill="#000000" fillOpacity="0.16" />
          <path
            d="M0,-74 Q32,-53 65,-55 C70,15 43,56 0,76 C-43,56 -70,15 -65,-55 Q-32,-53 0,-74 Z"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.4"
            strokeWidth="7"
          />
          <path d="M-34,-2 L-8,26 L38,-30" fill="none" stroke="#ffffff" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {kind === "flower" && (
        <g>
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} r="46" cx={Math.cos(((a - 90) * Math.PI) / 180) * 56} cy={Math.sin(((a - 90) * Math.PI) / 180) * 56} fill={colour} />
          ))}
          <circle r="34" fill="#ffc53d" />
        </g>
      )}
      {kind === "lock" && (
        <g>
          <path d="M-50,-30 L-50,-48 A50,55 0 0 1 50,-48 L50,-30" fill="none" stroke="#e9a51c" strokeWidth="24" strokeLinecap="round" />
          <rect x="-82" y="-30" width="164" height="126" rx="30" fill={colour} />
          <circle cy="22" r="17" fill="#8a5a00" />
          <line x1="0" y1="22" x2="0" y2="56" stroke="#8a5a00" strokeWidth="14" strokeLinecap="round" />
        </g>
      )}
      {kind === "gift" && (
        <g>
          <rect x="-74" y="-20" width="148" height="114" rx="16" fill={colour} />
          <rect x="-88" y="-50" width="176" height="42" rx="14" fill="#e23a66" />
          <rect x="-15" y="-50" width="30" height="144" fill="#ffc53d" />
          <circle cx="-26" cy="-72" r="26" fill="#ffc53d" />
          <circle cx="26" cy="-72" r="26" fill="#ffc53d" />
        </g>
      )}
      {kind === "skr" && (
        // The SKR token itself, from the app's own file.
        <image href="/app/skr_token.png" x="-100" y="-100" width="200" height="200" />
      )}
      {kind === "bag" && (
        // The shopping bag from the app's first page, in colour: the body, its handle and a smile.
        <g fill="none" strokeLinecap="round">
          <path d="M-40,-40 A40,44 0 0 1 40,-40" stroke="#c94a12" strokeWidth="16" />
          <rect x="-82" y="-44" width="164" height="140" rx="26" fill={colour} />
          <rect x="-82" y="-44" width="164" height="34" rx="17" fill="#ffffff" fillOpacity="0.22" />
          <path d="M-36,14 A40,34 0 0 0 36,14" stroke="#ffffff" strokeWidth="14" />
        </g>
      )}
      {kind === "wallet" && (
        <g>
          <rect x="-90" y="-66" width="180" height="136" rx="28" fill="#4aa8f5" />
          <rect x="-90" y="-66" width="180" height="70" rx="28" fill={colour} />
          <rect x="20" y="-20" width="84" height="50" rx="25" fill={colour} />
          <circle cx="50" cy="5" r="14" fill="#ffc53d" />
        </g>
      )}
    </svg>
  );
}
