import Image from "next/image";
import type { ReactNode } from "react";
import { Container, Eyebrow, Heading, Marked, Phone, WalletMarks } from "@/components/ui";
import { Scrap, type ScrapKind } from "@/components/Art";
import { HeroStage } from "@/components/HeroStage";
import { LogoWall } from "@/components/LogoWall";
import { Reveal } from "@/components/Reveal";
import { serviceCounts } from "@/lib/catalogue";
import { Footer, Header } from "@/components/Chrome";
import { site } from "@/lib/site";
import { Waitlist } from "@/components/Waitlist";
import { QrArt } from "@/components/QrArt";
import { SkrCoins } from "@/components/SkrCoins";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gap />
        <Does />
        <Services />
        <Duo />
        <Safe />
        <Next />
        <Team />
        <GetTheApp />
      </main>
      <Footer />
    </>
  );
}

/** A few stars either side of the mark on a wide screen, each with its mirror. Nothing else. */
const AROUND: { kind: ScrapKind; colour: string; left: string; top: string; size: number; turn: number; pace: number }[] = [
  { kind: "star", colour: "#ffc53d", left: "17%", top: "22%", size: 30, turn: -8, pace: 2.8 },
  { kind: "spark", colour: "#ffc53d", left: "27%", top: "56%", size: 20, turn: 0, pace: 3.2 },
  { kind: "star", colour: "#ffc53d", left: "12%", top: "80%", size: 24, turn: 8, pace: 3.6 },
  { kind: "star", colour: "#ffc53d", left: "83%", top: "22%", size: 30, turn: 8, pace: 3.1 },
  { kind: "spark", colour: "#ffc53d", left: "73%", top: "56%", size: 20, turn: 0, pace: 3.4 },
  { kind: "star", colour: "#ffc53d", left: "88%", top: "80%", size: 24, turn: -8, pace: 3.9 },
];

function Hero() {
  // The app's first page, laid out as the app lays it out: the mark that keeps becoming the next
  // thing AirPay is for on white, and under it the app's blue glow rising from the bottom with
  // the line and the one thing to do on it, in white. One screen, sized from the screen's height.
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="relative flex min-h-[min(100svh,980px)] flex-col items-center px-5 pt-[84px]">
        {/* The glow, drawn with the app's own stops: a dome, solid in its middle, with a long fade
            at the top and no edge. */}
        <div aria-hidden className="glow pointer-events-none absolute inset-x-0 bottom-0 h-[70%]" />

        <div className="relative flex w-full max-w-[1100px] flex-1 items-center justify-center">
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
            {AROUND.map((b, i) => (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: b.left, top: b.top, width: b.size, height: b.size }}>
                <div className="pop-in h-full w-full" style={{ ["--lag" as string]: `${0.2 + i * 0.05}s` }}>
                  <div className="drift h-full w-full" style={{ ["--turn" as string]: `${b.turn}deg`, ["--pace" as string]: `${b.pace}s`, ["--lag" as string]: `${-i * 0.4}s` }}>
                    <Scrap kind={b.kind} colour={b.colour} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-[min(72vw,34svh,350px)]">
            <HeroStage />
          </div>
        </div>

        <div className="relative flex w-full flex-col items-center pb-[min(8svh,80px)] pt-[2svh]">
          <h1 className="max-w-[980px] text-center text-[clamp(32px,min(9.5vw,7.6svh),76px)] font-bold leading-[1.08] tracking-[-0.045em] text-white">
            Crypto you can <span className="text-ink"><Marked>actually spend.</Marked></span>
          </h1>
          <div className="mt-[3.5svh] flex w-full flex-col items-center">
            <Waitlist />
          </div>
        </div>
      </div>

      {/* The blue thins out into the white of the next section, so the hero ends without a line. */}
      <div aria-hidden className="glow-tail h-[min(30svh,280px)]" />
    </section>
  );
}

/**
 * Why it exists, in one look: a picture, one line, two sentences. Short on purpose; the grid
 * under it is where the detail is.
 */
function Gap() {
  return (
    <section className="relative z-10 bg-white">
      <Container className="grid items-center gap-10 py-16 md:grid-cols-[1.05fr_1fr] md:gap-16 md:py-24">
        <Reveal className="grid grid-cols-2 gap-3 rounded-[32px] bg-night p-4 md:p-5" >
          <div className="rounded-[22px] bg-[#16191f] p-5">
            <p className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#8a93a0]">A wallet today</p>
            <p className="mt-5 font-figure text-[30px] font-extrabold leading-none text-[#5d6672] md:text-[38px]">$1,204</p>
            <p className="mt-1.5 text-[13px] font-medium text-[#5d6672]">+2.4% today</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {["Send", "Swap", "Receive", "Buy"].map((b) => (
                <span key={b} className="grid h-9 place-items-center rounded-xl bg-[#1f232b] text-[12px] font-medium text-[#5d6672]">{b}</span>
              ))}
            </div>
          </div>
          <div className="rounded-[22px] bg-white p-5">
            <p className="text-[12px] font-bold uppercase tracking-[1.5px] text-quiet">AirPay</p>
            <p className="mt-5 text-[19px] font-bold leading-[1.15] tracking-[-0.02em] md:text-[22px]">What do you need to pay for?</p>
            <ul className="mt-4 space-y-2">
              {[["Recharge", "#008fff"], ["Bills", "#14b866"], ["Gift cards", "#ff4f7b"], ["People", "#ff6a2b"]].map(([c, dot]) => (
                <li key={c} className="flex h-9 items-center gap-2.5 rounded-xl border-[1.5px] border-line px-3 text-[13px] font-bold">
                  <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-[34px] font-bold leading-[1.08] tracking-[-0.03em] md:text-[48px]">
            Wallets show what you hold. AirPay shows what you can do.
          </h2>
          <p className="mt-5 max-w-[500px] text-[18px] leading-[1.55] text-quiet">
            A wallet opens on a balance and buttons to trade. Nothing on it pays a bill, so people who earn on-chain
            still wait days to spend it. AirPay opens on what you can pay for.
          </p>
          <a href="#does" className="group mt-6 inline-flex items-center gap-2 text-[17px] font-bold text-blue-ink">
            See what it does
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

/** Everything it does, as a grid of tiles: one wide, the rest alike, each with its own picture. */
function Does() {
  return (
    // On a wide screen the whole section is held to about 1.3 screens: two rows of tiles whose
    // height follows the screen's, so every tile is in view with one short scroll.
    <section id="does" className="bg-mist">
      <Container className="py-16 md:py-[6svh]">
        <Reveal className="mx-auto text-center">
          <Eyebrow>Meet AirPay</Eyebrow>
          <Heading className="mt-3">One app for the things you pay for</Heading>
        </Reveal>

        <div id="does-tiles" className="mt-10 grid scroll-mt-[76px] gap-4 md:mt-[4svh] md:auto-rows-[clamp(330px,48svh,430px)] md:grid-cols-6">
          <Tile className="md:col-span-4 md:flex-row" delay={0}>
            <TileText
              kicker="Everyday essentials"
              title="Pay your bills"
              text="Recharge any phone. Pay for streaming, travel, food and shopping."
              className="md:max-w-[52%]"
            />
            <div className="relative mt-8 h-[300px] w-full md:mt-0 md:h-auto md:flex-1 md:self-stretch">
              <Phone flat src="/screens/services.jpg" alt="AirPay's services screen: a search bar, a filter button, and tiles for Hotstar, PhonePe, MakeMyTrip, Tinder, Amazon Prime and Uber" className="absolute left-1/2 top-2 w-[230px] -translate-x-1/2 md:top-1 md:w-[250px]" />
            </div>
          </Tile>

          <Tile className="md:col-span-2" delay={90}>
            <TileText kicker="All your wallets" title="Every wallet in one place" text="Connect as many wallets as you want. Switch your paying wallet with one click." />
            <div className="mt-4 flex flex-1 items-end justify-center"><WalletPile /></div>
          </Tile>

          <Tile className="md:col-span-2" delay={0}>
            <TileText kicker="Send money" title="Pay anyone" text="Type a name. Every match shows the end of its wallet, so you know who you are paying." />
            <div className="mt-5 flex flex-1 flex-col justify-end gap-3">
              {/* The app's own Pay anyone field: the name's registry mark, the name, the end of
                  the wallet it resolves to, and the button. */}
              <div className="flex h-[58px] items-center gap-3 rounded-full bg-white pl-2 pr-2 shadow-[0_10px_26px_-16px_rgba(16,18,22,0.45)] ring-1 ring-line">
                <Image src="/app/brand_seeker.png" alt="" width={80} height={80} className="h-[42px] w-[42px] rounded-full object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[16px] font-bold leading-tight">maya.skr</span>
                  <span className="block font-mono text-[12px] leading-tight text-quiet">…q3Fn</span>
                </span>
                <span className="grid h-[42px] place-items-center rounded-full bg-blue px-5 text-[15px] font-bold text-white">Pay</span>
              </div>
              <div className="flex gap-2">
                {[
                  { n: ".skr", el: <Image src="/app/brand_seeker.png" alt="" width={48} height={48} className="h-6 w-6 rounded-full object-cover" /> },
                  { n: ".sol", el: <Image src="/app/id_sol.png" alt="" width={48} height={48} className="h-6 w-6 rounded-full object-cover" /> },
                  // eslint-disable-next-line @next/next/no-img-element
                  { n: ".air", el: <span className="grid h-6 w-6 place-items-center rounded-full bg-blue"><img src="/brand/mark-on-blue.svg" alt="" className="h-[15px] w-[15px] object-contain" /></span> },
                ].map((r) => (
                  <span key={r.n} className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-mist text-[15px] font-bold">
                    {r.el}
                    {r.n}
                  </span>
                ))}
              </div>
            </div>
          </Tile>

          <Tile className="md:col-span-2" delay={90}>
            <TileText kicker="Network fees" title="Forget about SOL" text="You never need SOL to pay. The network fee comes out of the USDC you already hold." />
            {/* The two cases, as two plain cards: what it costs, and when it costs nothing. */}
            <div className="mt-5 flex flex-1 items-end gap-2.5">
              <div className="flex-1 rounded-[20px] bg-mist p-4">
                <Image src="/app/token_usdc.png" alt="" width={56} height={56} className="h-7 w-7 rounded-full" />
                <p className="mt-3 font-figure text-[22px] font-bold leading-none tabular-nums">0.01 USDC</p>
                <p className="mt-1.5 text-[13px] font-medium leading-snug text-quiet">per payment, instead of SOL</p>
              </div>
              <div className="flex-1 rounded-[20px] bg-highlight p-4">
                <Image src="/app/skr_token.png" alt="" width={56} height={56} className="h-7 w-7 rounded-full" />
                <p className="mt-3 text-[22px] font-bold leading-none">Free</p>
                <p className="mt-1.5 text-[13px] font-medium leading-snug">when you hold 1,000 SKR</p>
              </div>
            </div>
          </Tile>

          <Tile className="md:col-span-2" delay={180}>
            <TileText kicker="Get paid" title="Get paid with a QR code" text="Enter an amount and show the code. The payment lands in your active wallet." />
            {/* The app's own wallet badge: a white tile for the code on the app's blue, and the
                wallet it pays under it. The line of light is the other phone reading it. */}
            <div className="mt-5 flex flex-1 items-end">
              <div className="flex w-full items-center gap-3 rounded-[24px] bg-blue p-2">
                <div className="relative shrink-0 rounded-[18px] bg-white p-2.5">
                  <QrArt className="h-[104px] w-[104px]" />
                  <div aria-hidden className="scan-line pointer-events-none absolute inset-2.5">
                    <div className="scan-beam absolute inset-x-0 h-[3px] rounded-full bg-blue shadow-[0_0_14px_3px_rgba(0,143,255,0.55)]" />
                  </div>
                </div>
                <div className="min-w-0 flex-1 pr-1">
                  <p className="text-[17px] font-bold leading-tight text-white">Solana wallet</p>
                  <div className="mt-2.5 flex items-center gap-2 rounded-[14px] bg-white p-2">
                    <Image src="/app/brand_seeker.png" alt="" width={64} height={64} className="h-8 w-8 rounded-full object-cover" />
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-bold leading-tight">maya.skr</span>
                      <span className="block font-mono text-[12px] leading-tight text-quiet">7xKp…q3Fn</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Tile>
        </div>
        {/* A marker at the end of the tiles: jumping to it puts the bottom row in view. */}
        <div id="does-end" aria-hidden className="scroll-mt-[calc(100svh-28px)]" />
      </Container>
    </section>
  );
}

/** One tile of the grid: white, rounded, a column unless told otherwise. */
function Tile({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={`flex min-h-[380px] flex-col overflow-hidden rounded-[32px] bg-white p-7 md:min-h-0 ${className}`}>
      {children}
    </Reveal>
  );
}

function TileText({ kicker, title, text, foot, className = "" }: { kicker: string; title: string; text: string; foot?: string; className?: string }) {
  return (
    <div className={className}>
      <Eyebrow className="text-blue-ink">{kicker}</Eyebrow>
      <h3 className="mt-2.5 text-[26px] font-bold leading-[1.1] tracking-[-0.03em] md:text-[27px]">{title}</h3>
      <p className="mt-2.5 text-[16px] leading-[1.45] text-quiet">{text}</p>
      {foot && (
        <p className="mt-5 flex items-start gap-2.5 text-[14px] font-medium leading-snug">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden>
            <circle cx="12" cy="12" r="11" fill="#00a344" />
            <path d="M7.500 12.300l3 3 6-6.500" fill="none" stroke="#fff" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {foot}
        </p>
      )}
    </div>
  );
}

/**
 * Three wallet cards, drawn as the app's Wallets page draws them: the wallet's own icon and the
 * end of its address across the top, its name and balance at the foot, and the one in use marked
 * Active. Seeker's is the app's own gradient, black at the top running down to mint, and it is in
 * front and whole so that gradient can be seen; the other two show their top edges behind it.
 * Addresses and balances are made up.
 */
function WalletPile() {
  const cards = [
    { name: "Phantom", mark: "phantom", address: "Bq2m…Wd8T", bg: "#9886e5", top: "#ffffff", foot: "#ffffff", usd: "$56.02", active: false },
    { name: "Solflare", mark: "solflare", address: "Hn5v…c9Rz", bg: "#ffef47", top: "#343433", foot: "#343433", usd: "$12.75", active: false },
    { name: "maya.skr", mark: "seeker", address: "7xKp…q3Fn", bg: "linear-gradient(180deg,#000000 0%,#00090e 22%,#012c3f 42%,#017f9f 62%,#1fcdd3 80%,#86f7e2 100%)", top: "#ffffff", foot: "#16181c", usd: "$128.40", active: true },
  ];
  // Each card stands this far below the one behind it, as a share of a card's own height: enough
  // for the one behind to show its icon and its address.
  const STEP = 0.3;
  const tall = 1 + STEP * (cards.length - 1);
  return (
    <div className="w-full max-w-[268px]" role="img" aria-label="Three linked wallets as cards: Phantom, then Solflare, then a Seeker wallet in front, marked Active">
      <div className="relative w-full" style={{ aspectRatio: `1.9 / ${tall}` }}>
        {cards.map((c, i) => (
          <div
            key={c.name}
            className="absolute inset-x-0 flex flex-col justify-between rounded-[20px] px-[5%] py-[4%] shadow-[0_-8px_22px_-16px_rgba(16,18,22,0.5)]"
            style={{ background: c.bg, top: `${((i * STEP) / tall) * 100}%`, aspectRatio: "1.9 / 1", zIndex: i }}
          >
            <div className="flex items-center justify-between" style={{ color: c.top }}>
              <Image src={`/app/ic_wallet_${c.mark}.png`} alt="" width={80} height={80} className="h-7 w-7 rounded-[7px] object-contain" />
              <span className="font-mono text-[12px] font-medium">{c.address}</span>
            </div>
            <div className="flex items-end justify-between" style={{ color: c.foot }}>
              <div>
                <p className="text-[12px] font-bold">{c.name}</p>
                <p className="font-figure text-[20px] font-bold leading-tight tabular-nums">{c.usd}</p>
              </div>
              {c.active && <span className="rounded-full bg-[#1f7a37] px-2.5 py-1 text-[11px] font-bold text-white ring-2 ring-white">Active</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function Services() {
  const counts = await serviceCounts();
  return (
    <section id="services" className="overflow-hidden bg-mist py-20 md:py-24">
      <Container>
        <Reveal className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <Eyebrow>Spend</Eyebrow>
          <Heading className="mt-3">
            We are live with <span className="font-figure tabular-nums">{Math.floor(counts.total / 50) * 50}+</span> services accepting crypto
          </Heading>
        </Reveal>
      </Container>
      <Reveal className="mt-12">
        <LogoWall />
      </Reveal>
    </section>
  );
}

/** Two boxes side by side: the tap, and what the tap earns. */
function Duo() {
  return (
    <section id="earn">
      <Container className="py-16 md:py-24">
        <Reveal className="mx-auto text-center">
          <Eyebrow>For Seeker owners</Eyebrow>
          <Heading className="mt-3">Seeker also unlocks</Heading>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
          <Reveal className="flex min-h-[600px] flex-col overflow-hidden rounded-[36px] bg-[#e9f4ff] p-7 md:p-10">
            <p className="w-fit rounded-full bg-blue px-4 py-1.5 text-[14px] font-bold uppercase tracking-[1.5px] text-white">Tap to pay</p>
            <h3 className="mt-5 text-[32px] font-bold leading-[1.06] tracking-[-0.03em] md:text-[42px]">A payment that feels like a tap</h3>
            <div className="mt-8 flex flex-1 items-end justify-center">
              <TapCard />
            </div>
          </Reveal>

          <Reveal delay={120} className="flex min-h-[600px] flex-col overflow-hidden rounded-[36px] bg-night p-7 text-white md:p-10">
            <p className="w-fit rounded-full bg-highlight px-4 py-1.5 text-[14px] font-bold uppercase tracking-[1.5px] text-ink">SKR rewards</p>
            <h3 className="mt-5 text-[32px] font-bold leading-[1.06] tracking-[-0.03em] md:text-[42px]">Earn SKR. Keep it.<br />Pay no fees.</h3>
            <p className="mt-4 max-w-[420px] text-[17px] leading-[1.5] text-[#b4bdc9]">Hold 1,000 SKR and your network fees are on us.</p>
            <div className="mt-6 flex flex-1 items-end justify-center">
              <SkrCoins />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * The pay sheet a tap opens, as the app draws it: who is being paid, how much, the fee, and the
 * button. A card on the page, with the contactless sign over it for the tap that opened it.
 */
function TapCard() {
  return (
    <div className="relative w-full max-w-[360px]" role="img" aria-label="AirPay's pay sheet after a tap: Pay maya.skr 12.00 USDC, network fee free, with a Confirm and pay button">
      <div className="absolute -top-5 right-5 z-10 grid h-14 w-14 place-items-center rounded-full bg-blue shadow-[0_14px_30px_-10px_rgba(0,116,209,0.8)]">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <path d="M6.5 8.5a5 5 0 0 1 0 7M10 6a8.5 8.5 0 0 1 0 12M13.5 3.5a12 12 0 0 1 0 17" />
        </svg>
      </div>
      <div className="rounded-t-[32px] bg-white p-6 pb-7 shadow-[0_-18px_50px_-24px_rgba(0,60,120,0.45)]">
        <div className="mx-auto h-1 w-9 rounded-full bg-line" />
        <div className="mt-5 flex items-center gap-3">
          <span className="flex">
            <Image src="/app/brand_seeker.png" alt="" width={92} height={92} className="h-[46px] w-[46px] rounded-full border-[3px] border-white object-cover" />
            <Image src="/app/brand_seeker.png" alt="" width={92} height={92} className="-ml-4 h-[46px] w-[46px] rounded-full border-[3px] border-white object-cover" />
          </span>
          <span>
            <span className="block text-[19px] font-bold leading-tight">Pay maya.skr</span>
            <span className="block font-mono text-[13px] text-quiet">7xKp…q3Fn</span>
          </span>
        </div>
        <p className="mt-5 font-figure text-[46px] font-bold leading-none tracking-[-0.03em] tabular-nums">
          12.00 <span className="text-[22px] tracking-normal">USDC</span>
        </p>
        <dl className="mt-4 border-t border-line text-[15px]">
          <div className="flex items-center justify-between py-2.5"><dt className="text-quiet">Network fee</dt><dd className="rounded-full bg-highlight px-3 py-0.5 font-bold">Free. It&apos;s on us</dd></div>
        </dl>
        <span className="mt-4 grid h-[56px] place-items-center rounded-[18px] bg-blue text-[19px] font-bold text-white">Confirm and pay</span>
      </div>
    </div>
  );
}

function Safe() {
  const points = [
    { title: "AirPay never holds your keys", text: "There is nothing of yours for us to lose. Signing is done by your own wallet, every time." },
    { title: "You see who you are paying", text: "A name always shows the end of its wallet, and a request shows who is asking before you approve." },
    { title: "Paid means confirmed", text: "The green tick waits for Solana to confirm. If it is still on its way, the app says so and does not ask you to pay twice." },
  ];
  return (
    <section>
      <Container className="py-20 md:py-28">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>Safe by design</Eyebrow>
          <Heading className="mt-4">Your money stays <Marked>yours</Marked></Heading>
        </Reveal>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 110} className="rounded-[28px] border-[1.5px] border-line p-7">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-blue">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                  <path d="M12 2.500c2 1.400 4.200 2 6.500 1.900.300 6.200-1.700 11.400-6.500 14.600C7.200 15.800 5.200 10.600 5.500 4.400 7.800 4.500 10 3.900 12 2.500Z" fill="#fff" />
                  <path d="M9 11.300l2.200 2.200 3.900-4.400" fill="none" stroke="#008fff" strokeWidth="1.900" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-5 text-[21px] font-bold leading-tight tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-2.5 text-[17px] leading-[1.5] text-quiet">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** What early users asked for. Every item is planned and none is in the app yet, and it says so. */
function Next() {
  const asked = [
    "Automatic saving, like an SIP",
    "Credits for Claude and other AI models",
    "Buy and manage eSIMs",
    "Auto-pay: recharges and subscriptions that renew themselves",
    "One code for all your wallets",
    "A private payment ID",
    "Split bills and bill reminders",
  ];
  return (
    <section className="bg-mist">
      <Container className="grid gap-12 py-20 md:grid-cols-[0.85fr_1.15fr] md:gap-20 md:py-28">
        <Reveal>
          <Eyebrow>From feedback</Eyebrow>
          <Heading className="mt-4">What is coming next</Heading>
          <p className="mt-5 max-w-[420px] text-[18px] leading-[1.55] text-quiet">
            AirPay is in private beta with a small circle of people who earn on-chain. This is what they asked for.
            None of it is in the app yet.
          </p>
        </Reveal>
        <ol className="divide-y divide-line rounded-[28px] bg-white px-6 md:px-8">
          {asked.map((a, i) => (
            <Reveal as="li" key={a} delay={i * 60} className="flex items-center gap-5 py-5">
              <span className="w-7 shrink-0 font-figure text-[18px] font-bold text-quiet tabular-nums">{i + 1}</span>
              <span className="flex-1 text-[18px] font-medium leading-snug">{a}</span>
              <span className="hidden shrink-0 rounded-full border-[1.5px] border-line px-3 py-1 text-[13px] font-bold text-quiet sm:block">Planned</span>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Team() {
  const people = [
    {
      name: "Fahad Khan",
      role: "Founder and CTO, builds the app",
      lines: ["Developer at X2C, a Solana game studio", "1st place, MagicBlock Blitz v8 hackathon", "Solana Super Devs graduate and Superteam member"],
      initial: "F",
      ground: "#008fff",
    },
    {
      name: "Akshat Rai",
      role: "Co-founder, product and finance",
      lines: ["Trader and product manager from traditional finance", "Master's in Finance, University of Edinburgh (current)", "Graduate of Delhi Technological University"],
      initial: "A",
      ground: "#14b866",
    },
  ];
  return (
    <section id="team">
      <Container className="py-20 md:py-28">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Eyebrow>The team</Eyebrow>
          <Heading className="mt-4">One of us lives on-chain. The other never did.</Heading>
          <p className="mx-auto mt-5 max-w-[560px] text-[18px] leading-[1.55] text-quiet">
            That is why AirPay is built to feel like the payment apps ordinary people already use, and not like a
            trading screen.
          </p>
        </Reveal>
        <ul className="mx-auto mt-14 grid max-w-[920px] gap-5 md:grid-cols-2">
          {people.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 120} className="rounded-[28px] border-[1.5px] border-line p-7 md:p-8">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full text-[22px] font-bold text-white" style={{ background: p.ground }} aria-hidden>
                  {p.initial}
                </span>
                <div>
                  <h3 className="text-[23px] font-bold leading-tight tracking-[-0.02em]">{p.name}</h3>
                  <p className="mt-0.5 text-[15px] text-quiet">{p.role}</p>
                </div>
              </div>
              <ul className="mt-6 space-y-2.5 text-[16px] leading-snug">
                {p.lines.map((l) => (
                  <li key={l} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                    {l}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function GetTheApp() {
  return (
    <section id="get">
      <Container className="pb-16 md:pb-24">
        <Reveal className="relative overflow-hidden rounded-[44px] bg-blue px-6 py-20 text-center text-white md:px-12 md:py-28">
          {/* A lighter pool in the middle, so the panel is lit and not flat. */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[120%] w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.28),rgba(255,255,255,0)_62%)]" />
          <div className="relative flex flex-col items-center">
            <h2 className="max-w-[760px] text-[40px] font-bold leading-[1.04] tracking-[-0.04em] md:text-[68px]">
              Make your wallet a way of paying.
            </h2>
            <p className="mt-6 max-w-[540px] text-[20px] font-bold leading-[1.45]">
              AirPay runs on Solana mainnet. It is in private beta while it heads to the Solana dApp Store.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <a
                href={site.appUrl}
                className="inline-flex h-[60px] items-center justify-center rounded-full bg-white px-9 text-[19px] font-bold text-blue-ink shadow-[0_14px_30px_-12px_rgba(0,40,90,0.6)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                Get the app
              </a>
              <a
                href={site.repoUrl}
                className="inline-flex h-[60px] items-center justify-center rounded-full border-2 border-white px-8 text-[19px] font-bold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                View the code
              </a>
            </div>
            <p className="mt-9 flex items-center gap-2.5 text-[19px] font-bold">
              Works with <WalletMarks size={30} /> and more
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
