/**
 * The Seeker owners' picture (user's reference, 2026-10-11): a Seeker lying on its side, seen
 * from the back, with light pouring up out of its Seed Vault and opening into the box that holds
 * what the phone unlocks. Two drawings, stacked by the section: `Beam`, then `SeekerBack`.
 *
 * Both are measured off the reference at one scale (its own pixels, the phone's left edge as 0),
 * so the beam's foot is exactly as wide as the Seed Vault plate when the phone is shown at
 * `PHONE_SHARE` of the beam's width, centred.
 */

/** How wide the phone is drawn, as a share of the beam's width. The plate is 23.8% of the phone. */
export const PHONE_SHARE = 0.62;

const FOOT = (1000 * PHONE_SHARE * 0.238) / 2; // half the beam's foot, on a 1000-wide box
const H = 260;

/** One strand of light: straight out of the plate, then flaring out to the box. `t` −1 … 1. */
function strand(t: number, reach = 496) {
  const xb = 500 + t * FOOT;
  const xt = 500 + t * reach;
  return `M${xb.toFixed(1)},${H} C${xb.toFixed(1)},${(H * 0.56).toFixed(0)} ${(500 + t * reach * 0.56).toFixed(1)},${(H * 0.24).toFixed(0)} ${xt.toFixed(1)},0`;
}

/**
 * The light, for a white page: a trumpet of teal, strongest at the plate and thinning as it
 * opens, with strands in it that run from the plate to the box (`.beam-strand` in globals.css;
 * still under reduced motion). Drawn with its foot at the bottom; `down` turns it over for a
 * phone that sits above the box, and the strands then run downward by themselves. It fills the
 * box it is given.
 */
export function Beam({ className = "", down = false }: { className?: string; down?: boolean }) {
  const N = 39;
  const strands = Array.from({ length: N }, (_, i) => -1 + (2 * i) / (N - 1));
  // The body: up the left edge, across the top, back down the right edge.
  const body = `${strand(-1)} L996,0 C${(500 + 496 * 0.56).toFixed(1)},${(H * 0.24).toFixed(0)} ${(500 + FOOT).toFixed(1)},${(H * 0.56).toFixed(0)} ${(500 + FOOT).toFixed(1)},${H} Z`;
  return (
    <svg viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none" className={className} style={down ? { transform: "scaleY(-1)" } : undefined} aria-hidden>
      <defs>
        <linearGradient id="beam-body" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1fc3d3" stopOpacity="0.8" />
          <stop offset="0.4" stopColor="#5fd8e4" stopOpacity="0.42" />
          <stop offset="1" stopColor="#9be9f1" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="beam-strand" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#0aa9ba" stopOpacity="0.8" />
          <stop offset="1" stopColor="#2fc4d2" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d={body} fill="url(#beam-body)" />
      <g fill="none" stroke="url(#beam-strand)" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        {strands.map((t, i) => (
          <path
            key={i}
            d={strand(t * 0.97)}
            className="beam-strand"
            strokeWidth={i % 3 === 0 ? 2 : 1.1}
            strokeOpacity={0.5 + ((i * 7) % 5) * 0.11}
            style={{ animationDuration: `${2.2 + ((i * 5) % 7) * 0.28}s`, animationDelay: `${-((i * 3) % 11) * 0.31}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * The phone, from the back, on its side: only the 300 nearest its Seed Vault edge is in the box,
 * and it fades away past that, so on a white page it needs nothing to cut it off. The plate
 * stands at that edge in the middle, the cameras to its right — a pill of two and a single —
 * with the flash by them and the logo on the left.
 *
 * `hang` turns it over so the Seed Vault edge is at the bottom, for a phone that sits above what
 * it lights. Everything is mirrored top to bottom except the lettering, which is set back
 * upright in its mirrored place.
 */
const SLICE = 300;

export function SeekerBack({ className = "", hang = false }: { className?: string; hang?: boolean }) {
  const fade = `linear-gradient(${hang ? "to top" : "to bottom"}, #000 52%, transparent 100%)`;
  const lettering = (
    <text x="520" y={hang ? SLICE - 50 : 66} fontSize="23" letterSpacing="3.4" fontFamily="ui-sans-serif, system-ui, sans-serif" fill="#dfe8ea" fillOpacity="0.85">
      SEED VAULT
    </text>
  );
  return (
    <svg
      viewBox={`0 0 1290 ${SLICE}`}
      className={className}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
      role="img"
      aria-label="A Seeker phone seen from the back, with light coming out of its Seed Vault"
    >
      <defs>
        <linearGradient id="seeker-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#566164" />
          <stop offset="0.5" stopColor="#3d4649" />
          <stop offset="1" stopColor="#2a3133" />
        </linearGradient>
        <linearGradient id="seeker-plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#86a2aa" />
          <stop offset="0.45" stopColor="#4c5c61" />
          <stop offset="1" stopColor="#2c3437" />
        </linearGradient>
        <linearGradient id="seeker-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fa3a8" />
          <stop offset="0.06" stopColor="#30383b" />
        </linearGradient>
      </defs>
      <g transform={hang ? `translate(0 ${SLICE}) scale(1 -1)` : undefined}>
        {/* The frame, then the back panel a hair inside it. */}
        <rect x="0" y="0" width="1290" height="700" rx="74" fill="url(#seeker-rim)" />
        <rect x="5" y="5" width="1280" height="690" rx="69" fill="url(#seeker-body)" />

        {/* Seed Vault: flush with the edge, rounded only on its inner side. */}
        <path d="M488,0 H795 V191 A22,22 0 0 1 773,213 H510 A22,22 0 0 1 488,191 Z" fill="url(#seeker-plate)" />
        <path d="M488,0 H795" stroke="#d9f6fa" strokeWidth="5" />
        <g fill="none" stroke="#dfe8ea" strokeOpacity="0.9" strokeWidth="3.4">
          <circle cx="750" cy="57" r="21" />
          <circle cx="750" cy="57" r="8" />
          <path d="M729,57 H742 M758,57 H771" />
        </g>

        {/* Cameras: a pill of two, then one on its own. */}
        <g fill="#0b0e0f" stroke="#1b2224" strokeWidth="5">
          <rect x="853" y="77" width="234" height="106" rx="53" />
          <circle cx="1157" cy="130" r="53" />
        </g>
        {[908, 1035, 1157].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="130" r="30" fill="#161c1e" stroke="#4a585c" strokeWidth="3" />
            <circle cx={cx} cy="130" r="16" fill="#050607" stroke="#2a3437" strokeWidth="3" />
            <circle cx={cx + 5} cy="125" r="3.5" fill="#9fb4ba" />
          </g>
        ))}
        <circle cx="1095" cy="238" r="17" fill="#8793a0" stroke="#b9c4cc" strokeWidth="3" />

        {/* The logo: three upright bars, the middle one cut the other way. */}
        <g fill="#cfd6d8">
          <path d="M138,213 L153,221 V278 L138,270 Z" />
          <path d="M160,221 L175,213 V270 L160,278 Z" />
          <path d="M182,213 L197,221 V278 L182,270 Z" />
        </g>
      </g>
      {lettering}
    </svg>
  );
}
