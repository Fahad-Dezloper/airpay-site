import Image from "next/image";
import type { ReactNode } from "react";

/** The page's one content width, with the same gutter on every section. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-10 ${className}`}>{children}</div>;
}

/** A small uppercase label above a heading: the app's `micro` step. */
export function Eyebrow({ children, className = "text-quiet" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[12px] font-bold uppercase tracking-[1.5px] ${className}`}>{children}</p>;
}

/** A section's heading. One size for all of them, so the page has one voice. */
export function Heading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[34px] font-bold leading-[1.08] tracking-[-0.03em] md:text-[52px] ${className}`}>{children}</h2>
  );
}

/** The marker pen behind a few ink words. */
export function Marked({ children }: { children: ReactNode }) {
  return <span className="marked">{children}</span>;
}

const pill =
  "inline-flex h-[60px] items-center justify-center rounded-full px-8 text-[19px] font-bold tracking-[-0.2px] transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]";

/** The app's own button: bright blue, white words at 19 bold, which is the size white on that blue needs. */
export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={`${pill} bg-blue text-white shadow-[0_10px_24px_-8px_rgba(0,143,255,0.7)]`}>
      {children}
    </a>
  );
}

/** The second choice: an outline, in ink. */
export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={`${pill} border-[1.5px] border-line bg-white text-ink hover:border-ink`}>
      {children}
    </a>
  );
}

/**
 * A phone, drawn in CSS, showing a real screenshot of the app, whole.
 *
 * The screenshots are the Seeker's own shape, so the frame takes that shape and nothing is cropped.
 */
export function Phone({ src, alt, className = "", flat = false }: { src: string; alt: string; className?: string; flat?: boolean }) {
  // `flat` drops the shadow: inside a tile that clips it, the shadow is cut off square and
  // reads as a grey panel behind the phone.
  return (
    <div
      className={`relative aspect-[629/1400] overflow-hidden rounded-[40px] border-[9px] border-[#16181c] bg-white ${flat ? "" : "shadow-[0_36px_80px_-24px_rgba(16,18,22,0.5)]"} ${className}`}
    >
      <Image src={src} alt={alt} fill sizes="(min-width: 768px) 320px, 70vw" className="object-cover object-top" />
    </div>
  );
}

/** The four wallets it works with, as their own marks on their own colours, overlapped like coins. */
export function WalletMarks({ size = 30, ring = "#ffffff" }: { size?: number; ring?: string }) {
  const wallets: [string, string][] = [
    ["seeker", "#000000"],
    ["phantom", "#9886e5"],
    ["solflare", "#ffef47"],
    ["backpack", "#212122"],
  ];
  return (
    <span className="flex" role="img" aria-label="Seeker Wallet, Phantom, Solflare and Backpack">
      {wallets.map(([name, ground], i) => (
        <span
          key={name}
          className="grid place-items-center rounded-full border-2"
          style={{ width: size, height: size, background: ground, borderColor: ring, marginLeft: i ? -size * 0.26 : 0 }}
        >
          <Image src={`/app/ic_wallet_${name}.png`} alt="" width={40} height={40} className="object-contain" style={{ width: size * 0.54, height: size * 0.54 }} />
        </span>
      ))}
    </span>
  );
}
