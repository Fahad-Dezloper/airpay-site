import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Footer, Header } from "@/components/Chrome";
import { Reveal } from "@/components/Reveal";
import { Swatch } from "@/components/Swatch";
import { Container } from "@/components/ui";

/**
 * The brand page: the logo, the colours, the type, the voice, and the files.
 *
 * Built from airpay-brand-page/brand.md. The words inside that file's "Page copy" blocks are
 * used as written. Its section 10 lists what this page must not say or show: no trade mark
 * signs, no claims about how the logo was made, no other companies' logos, no invented numbers
 * or contact details. Every logo here is the kit's own SVG, shown as a file and never redrawn.
 */

export const metadata: Metadata = {
  title: "Brand · AirPay",
  description: "The AirPay logo, colours and guidelines.",
  openGraph: {
    title: "Brand · AirPay",
    description: "The AirPay logo, colours and guidelines.",
    images: [{ url: "/brand/og-brand.png", width: 1200, height: 630, alt: "AirPay" }],
  },
  twitter: { card: "summary_large_image", images: ["/brand/og-brand.png"] },
};

const KIT = "/brand/airpay-logo-kit.zip";

export default function Brand() {
  return (
    <>
      <Header />
      <main>
        <Opening />
        <Menu />
        <Stands />
        <LogoMeaning />
        <Versions />
        <Using />
        <Colour />
        <Type />
        <Voice />
        <Download />
      </main>
      <Footer />
    </>
  );
}

/** A section title in the brand's headline face. */
function Title({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="font-brand text-[36px] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-[52px]">
      {children}
    </h2>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-[640px] text-[19px] leading-[1.55] text-quiet">{children}</p>;
}

function Section({ id, children, tone = "" }: { id?: string; children: ReactNode; tone?: string }) {
  return (
    <section id={id} className={tone}>
      <Container className="py-16 md:py-24">{children}</Container>
    </section>
  );
}

function KitButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href={KIT}
      download
      className={`inline-flex h-[60px] items-center justify-center gap-2.5 rounded-full px-8 text-[19px] font-bold shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${light ? "bg-white text-blue-ink" : "bg-blue text-white"}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 4v11m0 0l-4.500-4.500M12 15l4.500-4.500M5 19.500h14" />
      </svg>
      Download the logo kit
    </a>
  );
}

function Opening() {
  return (
    <section id="top" className="relative overflow-hidden pt-[124px] md:pt-[168px]">
      <Container className="flex flex-col items-center pb-16 text-center md:pb-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/lockup/airpay-horizontal-light.svg" alt="AirPay logo, horizontal, on white" className="h-auto w-[78%] max-w-[520px]" />
        <h1 className="mt-12 font-brand text-[46px] font-extrabold leading-[1.02] tracking-[-0.02em] md:text-[84px]">The AirPay brand</h1>
        <p className="mt-6 max-w-[640px] text-[19px] leading-[1.55] text-quiet">
          AirPay lets you spend your crypto on everyday life. This page has our logo, our colours and the few rules for
          using them. If you are writing about AirPay or building with it, everything you need is here.
        </p>
        <div className="mt-9">
          <KitButton />
        </div>
      </Container>
    </section>
  );
}

/** The page's own short menu: where to jump to. It scrolls sideways on a phone rather than wrap. */
function Menu() {
  const items = [
    ["#logo", "Logo"],
    ["#colour", "Colour"],
    ["#type", "Type"],
    ["#voice", "Voice"],
    ["#download", "Download"],
  ];
  return (
    <nav aria-label="On this page" className="border-y border-line">
      <Container className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
        {items.map(([href, label]) => (
          <a key={href} href={href} className="inline-flex h-10 shrink-0 items-center rounded-full border-[1.5px] border-line px-4 text-[15px] font-medium text-ink transition-colors hover:border-ink">
            {label}
          </a>
        ))}
      </Container>
    </nav>
  );
}

function Stands() {
  const pillars = [
    ["Everyday first.", "AirPay opens on what you can do, not on what you own. Bills, recharges and people come before balances and charts."],
    ["One front, every wallet.", "You should not need a different app for each wallet. AirPay puts all of them behind one screen."],
    ["Your money stays yours.", "AirPay never holds your funds or your keys. Your own wallet approves every payment."],
    ["Plain enough for anyone.", "It should make sense to someone who has never heard the word blockchain."],
  ];
  return (
    <Section>
      <Reveal>
        <Title>What we stand for</Title>
      </Reveal>
      <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
        {pillars.map(([head, text], i) => (
          <Reveal as="li" key={head} delay={i * 90} className="rounded-[28px] bg-mist p-7 md:p-9">
            <h3 className="text-[24px] font-bold leading-tight tracking-[-0.02em]">{head}</h3>
            <p className="mt-3 text-[17px] leading-[1.55] text-quiet">{text}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function LogoMeaning() {
  const parts: [string, string][] = [
    ["The wallet", "is AirPay: the front, the thing you open."],
    ["It is solid,", "because your money stays yours. We are the front of your wallets, not a window into them."],
    ["Two cards,", "because you have more than one wallet, and they all belong in one place."],
    ["They are coming out,", "because this is about spending, not storing."],
    ["It stands on one line,", "level and steady, and its two feet and the peak between them hint at the A of our name."],
  ];
  return (
    <Section id="logo" tone="bg-mist">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal className="grid aspect-square place-items-center rounded-[36px] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/mark/mark.svg" alt="The AirPay mark: a blue wallet with a dark card and a pale-blue card coming out of it" className="w-[58%]" />
        </Reveal>
        <Reveal delay={120}>
          <Title>Our logo</Title>
          <Lead>A wallet you open, with every card you own in it, ready to spend.</Lead>
          <ul className="mt-8 space-y-4">
            {parts.map(([head, text]) => (
              <li key={head} className="flex gap-3.5 text-[17px] leading-[1.5]">
                <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-blue" />
                <span>
                  <b className="font-bold">{head}</b> <span className="text-quiet">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

type Tile = { name: string; alt: string; src: string; bg: string; png?: string; border?: boolean; wide?: boolean };

const TILES: Tile[] = [
  { name: "Horizontal", alt: "AirPay logo, horizontal, on white", src: "lockup/airpay-horizontal-light.svg", bg: "#ffffff", png: "lockup/airpay-horizontal-light-1024.png", border: true, wide: true },
  { name: "Horizontal, on blue", alt: "AirPay logo, horizontal, on blue", src: "lockup/airpay-horizontal-on-blue.svg", bg: "#008fff", wide: true },
  { name: "Horizontal, on dark", alt: "AirPay logo, horizontal, on dark", src: "lockup/airpay-horizontal-on-dark.svg", bg: "#0e1013", wide: true },
  { name: "Stacked", alt: "AirPay logo, stacked, on white", src: "lockup/airpay-stacked-light.svg", bg: "#ffffff", png: "lockup/airpay-stacked-light-1024.png", border: true },
  { name: "Stacked, on blue", alt: "AirPay logo, stacked, on blue", src: "lockup/airpay-stacked-on-blue.svg", bg: "#008fff" },
  { name: "Stacked, on dark", alt: "AirPay logo, stacked, on dark", src: "lockup/airpay-stacked-on-dark.svg", bg: "#0e1013" },
  { name: "Mark", alt: "AirPay mark, in colour, on white", src: "mark/mark.svg", bg: "#ffffff", png: "mark/mark-512.png", border: true },
  { name: "Mark, on blue", alt: "AirPay mark, on blue", src: "mark/mark-on-blue.svg", bg: "#008fff", png: "mark/mark-on-blue-512.png" },
  { name: "Mark, on dark", alt: "AirPay mark, on dark", src: "mark/mark-on-dark.svg", bg: "#0e1013", png: "mark/mark-on-dark-512.png" },
  { name: "One colour, black", alt: "AirPay mark, one colour, black on white", src: "mark/mark-black.svg", bg: "#ffffff", border: true },
  { name: "One colour, white", alt: "AirPay mark, one colour, white on dark", src: "mark/mark-white.svg", bg: "#0e1013" },
  { name: "App icon", alt: "AirPay app icon, with rounded corners", src: "app-icon/app-icon-rounded.svg", bg: "#f4f4f4", png: "app-icon/app-icon-rounded-512.png" },
];

function Versions() {
  return (
    <Section>
      <Reveal>
        <Title>Versions</Title>
        <Lead>
          Use the horizontal logo wherever you can. Use the stacked one when the space is square or tall, and the mark
          alone only where our name is already nearby.
        </Lead>
      </Reveal>
      <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {TILES.map((t, i) => (
          <Reveal as="li" key={t.name} delay={(i % 3) * 70}>
            {/* The picture is taken out of the flow and centred, so a tall logo cannot stretch its
                tile: every tile is the same shape whatever is in it. */}
            <div className={`relative aspect-[4/3] overflow-hidden rounded-[24px] ${t.border ? "border border-line" : ""}`} style={{ background: t.bg }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/brand/${t.src}`}
                alt={t.alt}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain ${t.wide ? "w-[64%]" : t.name === "App icon" ? "w-[36%]" : t.name.startsWith("Stacked") ? "h-[62%] w-auto" : "w-[34%]"}`}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-1">
              <p className="text-[15px] font-bold">{t.name}</p>
              <p className="flex gap-3 text-[14px] font-bold text-blue-ink">
                <a href={`/brand/${t.src}`} download className="hover:underline" aria-label={`Download ${t.name} as SVG`}>SVG</a>
                {t.png && <a href={`/brand/${t.png}`} download className="hover:underline" aria-label={`Download ${t.name} as PNG`}>PNG</a>}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/** One example of the logo used rightly or wrongly: the real file, treated with CSS. */
function Example({ ok, caption, bg = "#ffffff", imgStyle, src = "lockup/airpay-horizontal-light.svg", children, crowd = false }: {
  ok: boolean;
  caption: string;
  bg?: string;
  imgStyle?: CSSProperties;
  src?: string;
  children?: ReactNode;
  crowd?: boolean;
}) {
  return (
    <li>
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[24px] border border-line" style={{ background: bg }}>
        {children ?? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/brand/${src}`} alt="" className="w-[62%]" style={imgStyle} />
        )}
        {crowd && (
          <>
            <span className="absolute left-[8%] top-[30%] text-[13px] font-bold text-quiet">NEW</span>
            <span className="absolute bottom-[26%] right-[6%] rounded-md bg-highlight px-1.5 text-[12px] font-bold">Sale</span>
            <span className="absolute inset-x-[14%] top-[36%] h-[28%] border-2 border-dashed border-[#d70015]" />
          </>
        )}
        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full" style={{ background: ok ? "#00a344" : "#d70015" }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {ok ? <path d="M6 12.500l4 4 8-9" /> : <path d="M7 7l10 10M17 7L7 17" />}
          </svg>
        </span>
      </div>
      <p className="mt-3 px-1 text-[15px] font-medium">
        <span className="sr-only">{ok ? "Correct: " : "Incorrect: "}</span>
        {caption}
      </p>
    </li>
  );
}

function Using() {
  const sizes = [
    ["Horizontal logo", "96 px", "25 mm"],
    ["Stacked logo", "72 px", "20 mm"],
    ["Mark alone", "20 px", "6 mm"],
  ];
  return (
    <Section tone="bg-mist">
      <Reveal>
        <Title>Using it</Title>
        <Lead>
          Give the logo room: keep a margin around it as tall as the A in our name. Do not use it smaller than 96 pixels
          wide, or the mark alone smaller than 20.
        </Lead>
        <p className="mt-4 max-w-[640px] text-[19px] leading-[1.55] text-quiet">
          Please do not recolour it, stretch it, rotate it, add effects to it, or retype our name in another font.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-[1.25fr_1fr] md:gap-5">
        {/* Clear space: the logo inside the margin it must be given. */}
        <Reveal className="rounded-[28px] bg-white p-6 md:p-9">
          <h3 className="text-[21px] font-bold tracking-[-0.02em]">Clear space</h3>
          <div className="mt-6 grid place-items-center rounded-[18px] bg-[repeating-linear-gradient(45deg,#f1f8ff_0_8px,#e3f1ff_8px_16px)] p-[9%]" role="img" aria-label="The logo with an empty margin on every side, as tall as the capital A in the name">
            <div className="relative w-full bg-white p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/lockup/airpay-horizontal-light.svg" alt="" className="block w-full" />
              <span className="absolute -inset-px border border-dashed border-blue" />
            </div>
          </div>
          <p className="mt-5 text-[16px] leading-[1.5] text-quiet">
            The striped band is the margin: as tall as the capital A in the name, on every side. Nothing else goes in
            it. Around the mark alone, leave a quarter of the mark&apos;s width.
          </p>
        </Reveal>

        <Reveal delay={120} className="rounded-[28px] bg-white p-6 md:p-9">
          <h3 className="text-[21px] font-bold tracking-[-0.02em]">Smallest sizes</h3>
          <table className="mt-5 w-full text-left text-[16px]">
            <thead>
              <tr className="border-b border-line text-[13px] font-bold uppercase tracking-[1.2px] text-quiet">
                <th scope="col" className="py-3 pr-3 font-bold">Version</th>
                <th scope="col" className="py-3 pr-3 font-bold">Screen</th>
                <th scope="col" className="py-3 font-bold">Print</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map(([v, px, mm]) => (
                <tr key={v} className="border-b border-line last:border-0">
                  <th scope="row" className="py-4 pr-3 font-medium">{v}</th>
                  <td className="py-4 pr-3 font-figure tabular-nums">{px}</td>
                  <td className="py-4 font-figure tabular-nums">{mm}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-5 text-[16px] leading-[1.5] text-quiet">On a photograph or a busy pattern, put the logo on a white or blue panel first.</p>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <h3 className="text-[21px] font-bold tracking-[-0.02em]">Do and do not</h3>
      </Reveal>
      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        <Example ok caption="On white, the colour logo" />
        <Example ok caption="On blue, the on-blue logo" bg="#008fff" src="lockup/airpay-horizontal-on-blue.svg" />
        <Example ok caption="On dark, the on-dark logo" bg="#0e1013" src="lockup/airpay-horizontal-on-dark.svg" />
        <Example ok={false} caption="Do not recolour" imgStyle={{ filter: "hue-rotate(120deg) saturate(1.3)" }} />
        <Example ok={false} caption="Do not stretch" imgStyle={{ transform: "scaleX(1.4)" }} />
        <Example ok={false} caption="Do not rotate" imgStyle={{ transform: "rotate(-12deg)" }} />
        <Example ok={false} caption="Do not add effects" imgStyle={{ filter: "drop-shadow(5px 7px 5px rgba(0,0,0,0.55))" }} />
        <Example ok={false} caption="Do not use the colour logo on blue" bg="#008fff" />
        <Example ok={false} caption="Do not retype the name">
          <span className="flex w-[62%] items-center gap-[6%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/mark/mark.svg" alt="" className="w-[30%]" />
            <span className="font-serif text-[clamp(20px,4.2vw,44px)] italic text-ink">Airpay</span>
          </span>
        </Example>
        <Example ok={false} caption="Do not crowd it" crowd />
      </ul>
    </Section>
  );
}

function Colour() {
  const pairs: { bg: string; fg: string; ratio: string; label: string; border?: boolean }[] = [
    { bg: "#ffffff", fg: "#343433", ratio: "12.46 : 1", label: "Ink on white", border: true },
    { bg: "#ffffff", fg: "#6e6e6e", ratio: "5.10 : 1", label: "Quiet on white", border: true },
    { bg: "#ffffff", fg: "#0066cc", ratio: "5.57 : 1", label: "Deep blue on white", border: true },
    { bg: "#0e1013", fg: "#ffffff", ratio: "19.05 : 1", label: "White on night" },
    { bg: "#0e1013", fg: "#008fff", ratio: "5.78 : 1", label: "AirPay blue on night" },
    { bg: "#0e1013", fg: "#d7ff3a", ratio: "16.56 : 1", label: "Lime on night" },
  ];
  const share: [string, string, number, boolean][] = [
    ["White", "#ffffff", 70, false],
    ["Ink", "#343433", 20, true],
    ["Blue", "#008fff", 8, true],
    ["Lime", "#d7ff3a", 2, false],
  ];
  return (
    <Section id="colour">
      <Reveal>
        <Title>Colour</Title>
        <Lead>One blue carries the brand. White gives it room, ink does the reading, and a little lime marks the one thing worth noticing.</Lead>
        <p className="mt-3 text-[15px] text-quiet">Press a colour to copy its hex.</p>
      </Reveal>

      <Reveal className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        <div className="col-span-2 md:col-span-1"><Swatch large name="AirPay blue" hex="#008FFF" rgb="0, 143, 255" role="The brand colour: the wallet, the app icon, the one action on a screen" dark /></div>
        <Swatch large name="Ink" hex="#343433" rgb="52, 52, 51" role="Text, the front card, the name" dark />
        <Swatch large name="White" hex="#FFFFFF" rgb="255, 255, 255" role="The ground. Most of every page" dark={false} bordered />
        <Swatch large name="Night" hex="#0E1013" rgb="14, 16, 19" role="Dark surfaces" dark />
        <Swatch large name="Lime" hex="#D7FF3A" rgb="215, 255, 58" role="The highlight. Small areas, with ink on it" dark={false} />
      </Reveal>

      <Reveal className="mt-12">
        <h3 className="text-[21px] font-bold tracking-[-0.02em]">Supporting colours</h3>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          <Swatch name="Deep blue" hex="#0066CC" role="Blue as text and links on white" dark />
          <Swatch name="Quiet" hex="#6E6E6E" role="Secondary text" dark />
          <Swatch name="Line" hex="#EBEBEB" role="Dividers" dark={false} />
          <Swatch name="Sky" hex="#A9D8FF" role="Logo only: the outer card" dark={false} />
          <Swatch name="Pale sky" hex="#D6ECFF" role="Logo only: the outer card on the icon" dark={false} />
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <h3 className="text-[21px] font-bold tracking-[-0.02em]">Colours with a meaning</h3>
        <p className="mt-2 max-w-[640px] text-[16px] leading-[1.5] text-quiet">These are states in the app, not decoration.</p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
          <Swatch name="Success" hex="#00A344" role="Paid, done. As text: #1F7A35" dark />
          <Swatch name="Danger" hex="#FF4B45" role="A payment that failed or was declined. As text: #D70015" dark />
          <Swatch name="Orange" hex="#E46A00" role="Waiting on you. As text: #B35400" dark />
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
        <Reveal className="rounded-[28px] border border-line p-6 md:p-8">
          <h3 className="text-[21px] font-bold tracking-[-0.02em]">What may sit on what</h3>
          <p className="mt-2 text-[16px] leading-[1.5] text-quiet">Each of these is readable at any size. Blue on white, and white on blue, are for large headings, buttons and graphics only.</p>
          <ul className="mt-5 grid grid-cols-2 gap-2.5">
            {pairs.map((p) => (
              <li key={p.label} className={`rounded-[18px] p-4 ${p.border ? "border border-line" : ""}`} style={{ background: p.bg, color: p.fg }}>
                <p className="text-[16px] font-bold leading-tight">{p.label}</p>
                <p className="mt-1.5 font-figure text-[14px] tabular-nums">{p.ratio}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="rounded-[28px] border border-line p-6 md:p-8">
          <h3 className="text-[21px] font-bold tracking-[-0.02em]">How much of each</h3>
          <p className="mt-2 text-[16px] leading-[1.5] text-quiet">Mostly white, with ink for text, blue for the one thing that matters on a view, and lime for at most one small accent.</p>
          <div className="mt-6 flex h-[72px] overflow-hidden rounded-[18px] border border-line" role="img" aria-label="Roughly 70 percent white, 20 percent ink, 8 percent blue, 2 percent lime">
            {share.map(([name, hex, pct]) => (
              <span key={name} style={{ background: hex, width: `${pct}%` }} />
            ))}
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
            {share.map(([name, hex, pct]) => (
              <li key={name} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border border-line" style={{ background: hex }} />
                {name} <span className="font-figure text-quiet tabular-nums">{pct}%</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

function Type() {
  const glyphs = "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789";
  return (
    <Section id="type" tone="bg-mist">
      <Reveal>
        <Title>Type</Title>
        <Lead>Our name and headlines are set in Bricolage Grotesque ExtraBold. Everything else is Inter. Amounts of money are set in Geist, so the digits always line up.</Lead>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
        <Reveal className="rounded-[28px] bg-white p-7 md:p-9">
          <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-quiet">Bricolage Grotesque · ExtraBold</p>
          <p className="mt-5 font-brand text-[72px] font-extrabold leading-none tracking-[-0.02em] md:text-[104px]">AirPay</p>
          <p className="mt-6 break-words font-brand text-[20px] font-extrabold leading-[1.5] tracking-[-0.01em]">{glyphs}</p>
        </Reveal>
        <Reveal delay={120} className="rounded-[28px] bg-white p-7 md:p-9">
          <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-quiet">Inter · 400 to 700</p>
          <p className="mt-5 text-[72px] font-bold leading-none tracking-[-0.04em] md:text-[104px]">AirPay</p>
          <p className="mt-6 break-words text-[20px] font-medium leading-[1.5]">{glyphs}</p>
        </Reveal>
      </div>
      <Reveal className="mt-4 grid gap-8 rounded-[28px] bg-white p-7 md:mt-5 md:grid-cols-[1.4fr_1fr] md:p-9">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-quiet">In use</p>
          <p className="mt-4 font-brand text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em]">Pay a bill from the wallet you already have</p>
          <p className="mt-3 max-w-[520px] text-[17px] leading-[1.55] text-quiet">
            Pick what you are paying for, see the exact price, and approve it in your own wallet. Sentence case
            throughout, and no text in capitals except very small labels.
          </p>
        </div>
        <div className="md:border-l md:border-line md:pl-8">
          <p className="text-[13px] font-bold uppercase tracking-[1.2px] text-quiet">Geist · amounts</p>
          <p className="mt-4 font-figure text-[72px] font-extrabold leading-none tracking-[-0.02em] tabular-nums">$24.50</p>
          <p className="mt-3 text-[15px] text-quiet">Tabular figures, so digits line up. Addresses and codes are set in Geist Mono.</p>
        </div>
      </Reveal>
    </Section>
  );
}

function Voice() {
  const pairs = [
    ["Paid", "Transaction successful!"],
    ["Nothing was sent. Tap again.", "Something went wrong."],
    ["Pay a bill", "Initiate utility payment"],
    ["Your wallet approves every payment", "Non-custodial signing flow"],
  ];
  return (
    <Section id="voice">
      <Reveal>
        <Title>How we write</Title>
        <Lead>We say what happened to your money, in plain words, and then we stop.</Lead>
      </Reveal>
      <Reveal className="mt-10 overflow-hidden rounded-[28px] border border-line">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[13px] font-bold uppercase tracking-[1.2px]">
              <th scope="col" className="w-1/2 bg-[#eafaf1] px-5 py-4 font-bold text-success-ink md:px-8">We say</th>
              <th scope="col" className="w-1/2 bg-mist px-5 py-4 font-bold text-quiet md:px-8">We do not say</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map(([yes, no]) => (
              <tr key={yes} className="border-t border-line align-top">
                <td className="px-5 py-5 text-[18px] font-bold leading-snug md:px-8 md:text-[20px]">{yes}</td>
                <td className="px-5 py-5 text-[18px] leading-snug text-quiet line-through decoration-[#d70015] decoration-2 md:px-8 md:text-[20px]">{no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Section>
  );
}

function Download() {
  return (
    <section id="download">
      <Container className="pb-16 md:pb-24">
        <Reveal className="relative overflow-hidden rounded-[44px] bg-blue px-6 py-16 text-center text-white md:px-12 md:py-24">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[120%] w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.28),rgba(255,255,255,0)_62%)]" />
          <div className="relative flex flex-col items-center">
            <h2 className="font-brand text-[44px] font-extrabold leading-[1.02] tracking-[-0.02em] md:text-[68px]">Download</h2>
            <p className="mt-5 max-w-[560px] text-[20px] font-bold leading-[1.45]">
              The full kit has every version of the logo as SVG, PNG and JPG, the app icon, and a short guide.
            </p>
            <div className="mt-8">
              <KitButton light />
            </div>
            <p className="mt-4 text-[19px] font-bold">A zip file, about 3 MB</p>
            <p className="mt-10 max-w-[560px] text-[20px] font-bold leading-[1.45]">
              Writing about AirPay, or not sure which file to use? Get in touch and we will help.
            </p>
            {/* The brand and press address has not been decided. Until it is, this says so in
                the open rather than showing an invented one. Replace with a mailto link. */}
            <p className="mt-4 rounded-full border-2 border-dashed border-white px-5 py-2 text-[19px] font-bold">Contact address to be added</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
