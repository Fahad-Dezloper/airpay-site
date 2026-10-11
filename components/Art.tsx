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

export type ScrapKind =
  | "star" | "spark" | "coin" | "arrow" | "heart" | "shield" | "flower" | "lock" | "gift" | "wallet" | "bag" | "skr"
  // What the app does, as pieces (2026-10-11): each one a thing a person does in AirPay.
  | "send" | "scan" | "tick" | "loading" | "chat" | "tap" | "card" | "receipt" | "bell" | "qr";

/** Every piece with the pigment it is usually drawn in: the list `/art` shows, in this order. */
export const SCRAPS: { kind: ScrapKind; colour: string; label: string }[] = [
  { kind: "send", colour: "#008fff", label: "Send" },
  { kind: "scan", colour: "#008fff", label: "Scanner" },
  { kind: "wallet", colour: "#008fff", label: "Wallet" },
  { kind: "tick", colour: "#14b866", label: "Done" },
  { kind: "loading", colour: "#008fff", label: "Loading" },
  { kind: "chat", colour: "#14b866", label: "Ask" },
  { kind: "tap", colour: "#008fff", label: "Tap" },
  { kind: "card", colour: "#ff6a2b", label: "Card" },
  { kind: "receipt", colour: "#ffc53d", label: "Receipt" },
  { kind: "bell", colour: "#ffc53d", label: "Alert" },
  { kind: "qr", colour: "#343433", label: "Code" },
  { kind: "coin", colour: "#ffc53d", label: "Coin" },
  { kind: "shield", colour: "#008fff", label: "Safe" },
  { kind: "lock", colour: "#ffc53d", label: "Lock" },
  { kind: "gift", colour: "#ff4f7b", label: "Reward" },
  { kind: "bag", colour: "#ff6a2b", label: "Shop" },
  { kind: "heart", colour: "#ff4f7b", label: "Heart" },
  { kind: "flower", colour: "#7cc4ff", label: "Flower" },
  { kind: "arrow", colour: "#14b866", label: "Arrow" },
  { kind: "star", colour: "#ffc53d", label: "Star" },
  { kind: "spark", colour: "#ffc53d", label: "Spark" },
  { kind: "skr", colour: "#343433", label: "SKR" },
];

/** Shade on a piece: the same shape again in thin black, so it darkens whatever pigment is under it. */
const SHADE = { fill: "#000000", fillOpacity: 0.18 } as const;

/** One scattered piece. Fills the box it is given; `colour` is its main pigment. */
export function Scrap({ kind, colour }: { kind: ScrapKind; colour: string }) {
  // What is drawn *on* the pigment: white, unless the piece is itself white (as on the blue
  // ground), where the detail takes the brand's blue so it does not vanish.
  const on = colour.toLowerCase() === "#ffffff" ? "#008fff" : "#ffffff";
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
            stroke={on}
            strokeOpacity="0.4"
            strokeWidth="7"
          />
          <path d="M-34,-2 L-8,26 L38,-30" fill="none" stroke={on} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
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
          <path d="M-40,-40 A40,44 0 0 1 40,-40" stroke={colour} strokeWidth="16" />
          <path d="M-40,-40 A40,44 0 0 1 40,-40" stroke="#000000" strokeOpacity="0.2" strokeWidth="16" />
          <rect x="-82" y="-44" width="164" height="140" rx="26" fill={colour} />
          <rect x="-82" y="-44" width="164" height="34" rx="17" fill={on} fillOpacity="0.16" />
          <path d="M-36,14 A40,34 0 0 0 36,14" stroke={on} strokeWidth="14" />
        </g>
      )}
      {kind === "wallet" && (
        // A wallet, closed: the back panel standing a little proud of the front, a band of light
        // along the top, and the strap with its gold stud.
        <g>
          <rect x="-80" y="-84" width="150" height="70" rx="24" fill={colour} />
          <rect x="-80" y="-84" width="150" height="70" rx="24" {...SHADE} />
          <rect x="-92" y="-58" width="184" height="134" rx="30" fill={colour} />
          <rect x="-92" y="-58" width="184" height="30" rx="15" fill="#ffffff" fillOpacity="0.22" />
          <rect x="26" y="-16" width="80" height="50" rx="25" fill={colour} />
          <rect x="26" y="-16" width="80" height="50" rx="25" {...SHADE} />
          <circle cx="56" cy="9" r="13" fill="#ffc53d" />
        </g>
      )}
      {kind === "send" && (
        // A paper plane, nose up and to the right, the under wing in shade, two dashes of air behind.
        <g>
          <g stroke={colour} strokeOpacity="0.4" strokeWidth="14" strokeLinecap="round">
            <line x1="-78" y1="62" x2="-52" y2="40" />
            <line x1="-46" y1="94" x2="-28" y2="76" />
          </g>
          <g strokeLinejoin="round" strokeWidth="10">
            <polygon points="96,-90 10,98 -16,22" fill={colour} stroke={colour} />
            <polygon points="96,-90 10,98 -16,22" {...SHADE} />
            <polygon points="96,-90 -98,-12 -16,22" fill={colour} stroke={colour} />
          </g>
        </g>
      )}
      {kind === "scan" && (
        // The scanner: a tile, the four corners of its frame, and the line of light across it.
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-92" y="-92" width="184" height="184" rx="46" fill={colour} />
          <g stroke={on} strokeWidth="16">
            <path d="M-52,-22 V-36 A16,16 0 0 1 -36,-52 H-22" />
            <path d="M22,-52 H36 A16,16 0 0 1 52,-36 V-22" />
            <path d="M52,22 V36 A16,16 0 0 1 36,52 H22" />
            <path d="M-22,52 H-36 A16,16 0 0 1 -52,36 V22" />
          </g>
          <line x1="-66" y1="0" x2="66" y2="0" stroke={on} strokeOpacity="0.55" strokeWidth="15" />
        </g>
      )}
      {kind === "tick" && (
        // Done: a disc with a fat tick, and a lick of light on its shoulder.
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle r="96" fill={colour} />
          <path d="M-74,-30 A80,80 0 0 1 -30,-74" stroke={on} strokeOpacity="0.35" strokeWidth="12" />
          <path d="M-42,4 L-12,34 L44,-30" stroke={on} strokeWidth="27" />
        </g>
      )}
      {kind === "loading" && (
        // Working on it: a pale ring and a quarter of it in full colour, going round (`.scrap-spin`
        // in globals.css; still under reduced motion). The origin of this box is its middle.
        <g fill="none" stroke={colour} strokeWidth="30" strokeLinecap="round">
          <circle r="76" strokeOpacity="0.2" />
          <path className="scrap-spin" d="M0,-76 A76,76 0 0 1 76,0" />
        </g>
      )}
      {kind === "chat" && (
        // Ask: a speech bubble with its tail, and three dots.
        <g>
          <path d="M-50,38 L-64,90 L-6,46 Z" fill={colour} stroke={colour} strokeWidth="10" strokeLinejoin="round" />
          <rect x="-96" y="-74" width="192" height="126" rx="63" fill={colour} />
          <circle cx="-46" cy="-11" r="14" fill={on} />
          <circle cx="0" cy="-11" r="14" fill={on} />
          <circle cx="46" cy="-11" r="14" fill={on} />
        </g>
      )}
      {kind === "tap" && (
        // Tap: the radio reaching out from a point, each wave fainter than the last.
        <g fill="none" stroke={colour} strokeWidth="26" strokeLinecap="round">
          <circle cx="-70" cy="0" r="20" fill={colour} stroke="none" />
          <path d="M-26.9,-38.8 A58,58 0 0 1 -26.9,38.8" />
          <path d="M4.3,-66.9 A100,100 0 0 1 4.3,66.9" strokeOpacity="0.7" />
          <path d="M34,-93.7 A140,140 0 0 1 34,93.7" strokeOpacity="0.42" />
        </g>
      )}
      {kind === "card" && (
        // A card: its dark stripe, a gold chip, and a line of print.
        <g>
          <rect x="-96" y="-62" width="192" height="124" rx="24" fill={colour} />
          <rect x="-96" y="-36" width="192" height="28" {...SHADE} fillOpacity="0.26" />
          <rect x="-70" y="12" width="44" height="30" rx="8" fill="#ffc53d" />
          <line x1="8" y1="27" x2="64" y2="27" stroke={on} strokeOpacity="0.85" strokeWidth="12" strokeLinecap="round" />
        </g>
      )}
      {kind === "receipt" && (
        // A receipt with a torn foot and three lines of print.
        <g>
          <path
            d="M-70,-74 Q-70,-92 -52,-92 L52,-92 Q70,-92 70,-74 L70,90 L46.7,72 L23.3,90 L0,72 L-23.3,90 L-46.7,72 L-70,90 Z"
            fill={colour}
          />
          <g stroke={on} strokeWidth="13" strokeLinecap="round">
            <line x1="-42" y1="-54" x2="42" y2="-54" />
            <line x1="-42" y1="-20" x2="42" y2="-20" />
            <line x1="-42" y1="14" x2="4" y2="14" />
          </g>
        </g>
      )}
      {kind === "bell" && (
        // A bell with something to say: the clapper in shade, and a red dot on its shoulder.
        <g>
          <path d="M-26,66 A26,26 0 0 0 26,66 Z" fill={colour} />
          <path d="M-26,66 A26,26 0 0 0 26,66 Z" {...SHADE} fillOpacity="0.3" />
          <circle cy="-82" r="13" fill={colour} />
          <path
            d="M0,-76 C-48,-76 -62,-38 -62,4 C-62,32 -72,42 -82,54 L82,54 C72,42 62,32 62,4 C62,-38 48,-76 0,-76 Z"
            fill={colour}
            stroke={colour}
            strokeWidth="12"
            strokeLinejoin="round"
          />
          <circle cx="56" cy="-54" r="24" fill="#ff4f7b" stroke="#ffffff" strokeWidth="9" />
        </g>
      )}
      {kind === "qr" && (
        // A code to scan: three finder squares and a few loose blocks in the fourth corner.
        <g>
          {[[-90, -90], [14, -90], [-90, 14]].map(([x, y]) => (
            <g key={`${x},${y}`}>
              <rect x={x} y={y} width="76" height="76" rx="20" fill={colour} />
              <rect x={x + 17} y={y + 17} width="42" height="42" rx="9" fill={on} />
              <rect x={x + 28} y={y + 28} width="20" height="20" rx="5" fill={colour} />
            </g>
          ))}
          <rect x="16" y="16" width="30" height="30" rx="9" fill={colour} />
          <rect x="60" y="60" width="30" height="30" rx="9" fill={colour} />
          <rect x="62" y="18" width="24" height="24" rx="8" fill={colour} fillOpacity="0.45" />
          <rect x="18" y="62" width="24" height="24" rx="8" fill={colour} fillOpacity="0.45" />
        </g>
      )}
    </svg>
  );
}
