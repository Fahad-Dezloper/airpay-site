import Image from "next/image";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

/**
 * The logo: the mark and the name side by side, from the brand kit's own file
 * (airpay-brand/03-lockup). Never retyped, so it cannot drift from the kit. `height` is in px.
 */
export function Logo({ height }: { height: number }) {
  return (
    <Image
      src="/brand/airpay-horizontal-light.svg"
      alt="AirPay"
      width={Math.round((704.553 / 152.879) * height)}
      height={height}
      style={{ height, width: "auto" }}
      preload
    />
  );
}

export function Header() {
  // A bar across the whole top of the page, which stays there: the logo, the sections, and the
  // one button the page has.
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-5 md:px-8">
        <a href="/#top" aria-label="AirPay home" className="block">
          <Logo height={28} />
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-8 text-[15px] font-medium text-quiet md:flex">
          <a href="/#does" className="transition-colors hover:text-ink">What it does</a>
          <a href="/#services" className="transition-colors hover:text-ink">Services</a>
          <a href="/#earn" className="transition-colors hover:text-ink">Rewards</a>
          <a href="/#team" className="transition-colors hover:text-ink">Team</a>
          <a href="/brand" className="transition-colors hover:text-ink">Brand</a>
        </nav>
        <a
          href={site.appUrl}
          className="inline-flex h-11 items-center rounded-full bg-blue px-6 text-[15px] font-bold text-white transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
        >
          Get the app
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-4 py-8 text-[15px] text-quiet md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-7">
          <Logo height={24} />
          <a href="/#does" className="hover:text-ink">What it does</a>
          <a href="/#services" className="hover:text-ink">Services</a>
          <a href="/#team" className="hover:text-ink">Team</a>
          <a href="/brand" className="hover:text-ink">Brand</a>
        </div>
        <p>AirPay never holds your keys. Payments settle on Solana.</p>
      </Container>
    </footer>
  );
}
