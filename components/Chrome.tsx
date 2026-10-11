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
    <header className="fixed inset-x-0 top-0 z-50 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-5 md:px-8">
        <a href="/#top" aria-label="AirPay home" className="block">
          <Logo height={28} />
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-8 text-[15px] font-medium text-quiet md:flex">
          <a href="/#does" className="transition-colors hover:text-ink">What it does</a>
          <a href="/#services" className="transition-colors hover:text-ink">Services</a>
          <a href="/#earn" className="transition-colors hover:text-ink">Rewards</a>
          <a href="/brand" className="transition-colors hover:text-ink">Brand</a>
        </nav>
        <a
          href={site.appUrl}
          className="inline-flex h-11 items-center rounded-full bg-blue px-6 text-[15px] font-bold text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          Get the app
        </a>
      </div>
    </header>
  );
}

const FOOTER: { title: string; links: [string, string][] }[] = [
  { title: "Product", links: [["What it does", "/#does"], ["Services", "/#services"], ["For Seeker owners", "/#earn"], ["FAQs", "/#faq"]] },
  { title: "Developers", links: [["GitHub", site.repoUrl], ["Releases", `${site.repoUrl}/releases`]] },
  { title: "Company", links: [["Brand", "/brand"], ["Get the app", site.appUrl]] },
];

/** The mark on the left, three short lists of links, and the year and the code on the right. */
export function Footer() {
  return (
    <footer className="bg-white">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-10 py-14 text-[14px] sm:grid-cols-3 md:grid-cols-[1.1fr_1fr_1fr_1fr_auto] md:py-16">
        <a href="/#top" aria-label="AirPay home" className="col-span-2 block self-start sm:col-span-3 md:col-span-1">
          <Logo height={24} />
        </a>
        {FOOTER.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <p className="font-bold text-ink">{g.title}</p>
            <ul className="mt-3 grid gap-2.5">
              {g.links.map(([name, href]) => (
                <li key={name}>
                  <a href={href} className="text-quiet transition-colors hover:text-ink">{name}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="col-span-2 flex items-center justify-between gap-4 text-quiet sm:col-span-3 md:col-span-1 md:flex-col md:items-end md:justify-start">
          <p>© 2026 AirPay</p>
          <a href={site.repoUrl} aria-label="AirPay on GitHub" className="transition-colors hover:text-ink">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M12 2a10 10 0 0 0-3.160 19.490c.500.090.680-.220.680-.480v-1.700c-2.780.600-3.370-1.340-3.370-1.340-.450-1.160-1.110-1.470-1.110-1.470-.910-.620.070-.610.070-.610 1 .070 1.530 1.030 1.530 1.030.890 1.530 2.340 1.090 2.910.830.090-.650.350-1.090.630-1.340-2.220-.250-4.550-1.110-4.550-4.940 0-1.090.390-1.980 1.030-2.680-.100-.250-.450-1.270.100-2.650 0 0 .840-.270 2.750 1.020a9.560 9.560 0 0 1 5 0c1.910-1.290 2.750-1.020 2.750-1.020.550 1.380.200 2.400.100 2.650.640.700 1.030 1.590 1.030 2.680 0 3.840-2.340 4.680-4.570 4.930.360.310.680.920.680 1.850v2.740c0 .270.180.580.690.480A10 10 0 0 0 12 2Z" />
            </svg>
          </a>
        </div>
      </Container>
    </footer>
  );
}
