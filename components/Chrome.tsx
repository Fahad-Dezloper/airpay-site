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

/** The bar's links, beside the logo. Twitter opens in a new tab. */
const NAV: [string, string][] = [
  ["Changelog", "/changelog"],
  ["Twitter", site.twitterUrl],
  ["Brand", "/brand"],
];

export function Header() {
  // A bar across the whole top of the page, which stays there: the logo, the sections, and the
  // one button the page has.
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-5">
          <a href="/#top" aria-label="AirPay home" className="block">
            <Logo height={28} />
          </a>
          <nav aria-label="Pages" className="hidden items-center text-[15px] font-medium text-quiet sm:flex">
            {NAV.map(([name, href]) => (
              <a
                key={name}
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="rounded-full px-3.5 py-2 transition-colors hover:bg-mist hover:text-ink"
              >
                {name}
              </a>
            ))}
          </nav>
        </div>
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

const X_ICON = "M17.750 3h3.070l-6.710 7.670L22 21h-6.180l-4.840-6.330L5.440 21H2.370l7.180-8.200L2 3h6.340l4.370 5.780L17.750 3Zm-1.080 16.170h1.700L7.400 4.740H5.580l11.090 14.430Z";
const GITHUB_ICON =
  "M12 2a10 10 0 0 0-3.160 19.490c.500.090.680-.220.680-.480v-1.700c-2.780.600-3.370-1.340-3.370-1.340-.450-1.160-1.110-1.470-1.110-1.470-.910-.620.070-.610.070-.610 1 .070 1.530 1.030 1.530 1.030.890 1.530 2.340 1.090 2.910.830.090-.650.350-1.090.630-1.340-2.220-.250-4.550-1.110-4.550-4.940 0-1.090.390-1.980 1.030-2.680-.100-.250-.450-1.270.100-2.650 0 0 .840-.270 2.750 1.020a9.560 9.560 0 0 1 5 0c1.910-1.290 2.750-1.020 2.750-1.020.550 1.380.200 2.400.100 2.650.640.700 1.030 1.590 1.030 2.680 0 3.840-2.340 4.680-4.570 4.930.360.310.680.920.680 1.850v2.740c0 .270.180.580.690.480A10 10 0 0 0 12 2Z";

const FOOTER: { title: string; links: { name: string; href: string; icon?: string }[] }[] = [
  {
    title: "Product",
    links: [
      { name: "What it does", href: "/#does" },
      { name: "Services", href: "/#services" },
      { name: "For Seeker owners", href: "/#earn" },
      { name: "Get the app", href: site.appUrl },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Changelog", href: "/changelog" },
      { name: "FAQs", href: "/#faq" },
      { name: "Brand", href: "/brand" },
    ],
  },
  {
    title: "Developers",
    links: [
      { name: "Source code", href: site.repoUrl },
      { name: "Releases", href: `${site.repoUrl}/releases` },
    ],
  },
  {
    title: "Socials",
    links: [
      { name: "X.com", href: site.twitterUrl, icon: X_ICON },
      { name: "GitHub", href: site.repoUrl, icon: GITHUB_ICON },
    ],
  },
];

/**
 * The foot of the page: a white box on the page's grey, with the logo and a "Building" badge down
 * its left side and four short lists of links on its right. Under the box, outside it, the year
 * and the one line the whole site stands on.
 */
export function Footer() {
  return (
    <footer className="bg-mist px-3 pb-6 pt-3 md:px-5">
      <div className="mx-auto w-full max-w-[1400px] rounded-[32px] bg-white p-7 md:p-12">
        <div className="grid gap-10 md:grid-cols-[0.5fr_1fr] md:gap-12">
        <a href="/#top" aria-label="AirPay home" className="block self-start">
          <Logo height={30} />
        </a>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {FOOTER.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <p className="text-[15px] text-quiet">{g.title}</p>
              <ul className="mt-4 grid gap-3.5">
                {g.links.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline-offset-4 hover:underline"
                    >
                      {l.icon && (
                        <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0" fill="currentColor" aria-hidden>
                          <path d={l.icon} />
                        </svg>
                      )}
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        </div>

        {/* The last row of the box: the badge, and the place the floating "Get the app" button
            comes to rest (`data-get-dock`, read by FloatingGet). On a wide screen that is this
            same line, in the middle; on a phone, where the two would collide, the line under it. */}
        <div className="relative mt-10 md:mt-14 md:flex md:h-[58px] md:items-center">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-mist py-2 pl-3.5 pr-4 text-[14px] font-medium text-ink">
            <span className="h-2 w-2 rounded-full bg-blue" aria-hidden />
            Building
          </p>
          <div data-get-dock aria-hidden className="pointer-events-none mt-4 h-[58px] md:absolute md:inset-0 md:mt-0" />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2 px-3 pt-5 text-[14px] text-quiet sm:flex-row sm:items-center sm:justify-between">
        <p>© AirPay 2026</p>
        <p>AirPay never holds your keys. Payments settle on Solana.</p>
      </div>
    </footer>
  );
}
