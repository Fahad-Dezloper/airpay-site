import Image from "next/image";
import type { ReactNode } from "react";
import { Container, Eyebrow, Heading, Marked, Phone, SectionTag } from "@/components/ui";
import { LogoWall } from "@/components/LogoWall";
import { Reveal } from "@/components/Reveal";
import { serviceCounts } from "@/lib/catalogue";
import { Footer, Header } from "@/components/Chrome";
import { site } from "@/lib/site";
import { Waitlist } from "@/components/Waitlist";
import { OffersList } from "@/components/OffersList";
import { OneQr } from "@/components/OneQr";
import { Beam, PHONE_SHARE, SeekerBack } from "@/components/SeekerBeam";
import { PayAnyone } from "@/components/PayAnyone";
import { Secure } from "@/components/Secure";
import { FloatingGet } from "@/components/FloatingGet";
import { MeetLabel } from "@/components/MeetLabel";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Does />
        <Services />
        <Duo />
        {/* Taken off the page 2026-10-11 at the user's word; the sections are still below.
        <Secure />
        <Next />
        <Team />
        */}
        <Faq />
      </main>
      <Footer />
      <FloatingGet />
    </>
  );
}

function Hero() {
  // White and to the point: the line, what you can do, and the email field. Nothing either side.
  // It fills the screen. The next section's label, "Meet AirPay", waits at its foot just above
  // the floating button (`MeetLabel`), and settles above its own heading as the page scrolls.
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1560px] flex-col items-center justify-center gap-6 px-5 pb-[150px] pt-[104px]">
        <div className="flex max-w-[680px] flex-col items-center text-center">
          <h1 className="text-[clamp(38px,10.5vw,84px)] font-medium leading-[1.06] tracking-[-0.04em] lg:text-[clamp(52px,5.2vw,88px)]">
            Crypto you can actually spend.
          </h1>
          <p className="mt-6 max-w-[500px] text-[19px] leading-[1.5] text-quiet">
            Recharge your phone, pay bills, shop and order food, straight from the wallets you already have.
          </p>
          <div className="mt-8 flex w-full flex-col items-center">
            <Waitlist />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Everything it does, as a grid of tiles: one wide, the rest alike, each with its own picture. */
function Does() {
  return (
    // On a wide screen the whole section is held to about 1.3 screens: two rows of tiles whose
    // height follows the screen's, so every tile is in view with one short scroll.
    <section id="does" className="bg-white">
      <Container className="pb-16 pt-4 md:pb-24">
        {/* Outside the `Reveal`: it has to show from the first moment, lifted to the screen's foot. */}
        <div className="text-center">
          <MeetLabel />
        </div>
        <Reveal className="mx-auto text-center">
          <Heading className="mt-3">One app for the things you pay for</Heading>
        </Reveal>

        <div id="does-tiles" className="mt-10 grid scroll-mt-[76px] gap-4 md:mt-12 md:auto-rows-[clamp(400px,48svh,430px)] md:grid-cols-2 lg:grid-cols-6">
          <Tile className="md:col-span-2 md:flex-row lg:col-span-4" delay={0}>
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

          <Tile className="lg:col-span-2" delay={90}>
            <TileText kicker="All your wallets" title="Every wallet in one place" text="Connect as many wallets as you want. Switch your paying wallet with one click." />
            <div className="mt-4 flex flex-1 items-end justify-center"><WalletPile /></div>
          </Tile>

          <Tile className="lg:col-span-2" delay={0}>
            <TileText kicker="Send money" title="Pay anyone" text="Type a name. Every match shows the end of its wallet, so you know who you are paying." />
            {/* The app's own Pay anyone field, going round the three kinds of name; the chips under
                it choose one. */}
            <div className="mt-5 flex flex-1 flex-col">
              <PayAnyone />
            </div>
          </Tile>

          <Tile className="lg:col-span-2" delay={90}>
            <TileText kicker="Network fees" title="Forget about SOL" text="You never need SOL to pay." />
            {/* The two cases, as two plain cards. Left: with no SOL, the fee comes out of the
                token being sent, so it carries a row of tokens and a plus. Right: free for a
                wallet holding 1,000 SKR.
                NOTE (2026-10-12): the left card is ahead of the app. Today the fee wallet takes
                its fee in USDC only (tap/payer/skrpayer/sponsor.py); other tokens are covered
                only for 1,000 SKR holders. The user chose this wording knowing that. */}
            <div className="mt-5 flex flex-1 items-end">
              <div className="grid w-full grid-cols-2 gap-2.5">
              <div className="rounded-[20px] bg-white p-3.5">
                <div className="flex gap-1" role="img" aria-label="USDC, USDT, SKR and more">
                  <Image src="/app/token_usdc.png" alt="" width={56} height={56} className="h-6 w-6 rounded-full" />
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#26a17b] text-[13px] font-bold leading-none text-white">₮</span>
                  <Image src="/app/skr_token.png" alt="" width={56} height={56} className="h-6 w-6 rounded-full" />
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-mist text-ink">
                    <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden>
                      <path d="M8 2.500v11M2.500 8h11" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
                <p className="mt-2.5 text-[20px] font-bold leading-none">Any token</p>
                <p className="mt-1.5 text-[13px] font-medium leading-snug text-quiet">Pay gas from the token you are sending, not SOL</p>
              </div>
              <div className="flex flex-col rounded-[20px] bg-highlight p-3.5">
                <Image src="/app/skr_token.png" alt="" width={80} height={80} className="h-10 w-10 rounded-full" />
                <p className="mt-auto pt-2.5 text-[20px] font-bold leading-none">Free</p>
                <p className="mt-1.5 text-[13px] font-medium leading-snug">when you hold 1,000 SKR</p>
              </div>
              </div>
            </div>
          </Tile>

          <Tile className="lg:col-span-2" delay={180}>
            <TileText kicker="Get paid" title="One QR for every wallet" text="Share one code. The money lands in your active wallet." />
            {/* The claim, to try: press a wallet and it becomes the active one; the code stays. */}
            <div className="mt-5 flex flex-1 items-end">
              <OneQr />
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
    <Reveal delay={delay} className={`flex flex-col overflow-hidden rounded-[28px] bg-mist p-6 md:rounded-[32px] md:p-7 ${className}`}>
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
    { name: "dezloper.skr", mark: "seeker", address: "7xKp…q3Fn", bg: "linear-gradient(180deg,#000000 0%,#00090e 22%,#012c3f 42%,#017f9f 62%,#1fcdd3 80%,#86f7e2 100%)", top: "#ffffff", foot: "#16181c", usd: "$128.40", active: true },
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
    <section id="services" className="overflow-hidden bg-mist py-16 md:py-24">
      <Container>
        <Reveal className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <SectionTag>Spend</SectionTag>
          <Heading className="mt-3">
            We are live with <span className="font-figure tabular-nums">{Math.floor(counts.total / 50) * 50}+</span> services accepting crypto
          </Heading>
        </Reveal>
      </Container>
      <Reveal className="mt-10 md:mt-12">
        <LogoWall />
      </Reveal>
    </section>
  );
}

/**
 * What a Seeker unlocks, shown as coming out of the phone itself (2026-10-11, after the user's
 * reference): on the white page, a Seeker on its side with light pouring out of its Seed Vault,
 * and where the light opens out it draws a box — and in that box are the two things, the tap
 * and the offers only its owners can claim.
 *
 * **The whole section fits one screen** on a desktop: its tall parts — the cards and the beam —
 * are sized from the screen's height, and each card lays its words and its picture side by
 * side so it can be short. On a phone the cards stack and take the room they need.
 *
 * `PHONE_AT` is where the Seeker sits. "top": heading, phone hanging with its Seed Vault edge
 * down, the light falling into the box. "bottom": heading, box, the light rising out of a phone
 * at the foot. The phone is `PHONE_SHARE` of the box's width, which is what makes the beam's
 * foot exactly as wide as the Seed Vault plate.
 */
const PHONE_AT: "top" | "bottom" = "bottom";

/** The four things under "Seeker also unlocks": a label, a title and a few lines each. */
const SEEKER_UNLOCKS: { kicker: string; title: string; text: string }[] = [
  {
    kicker: "Offers",
    title: "Get paid for what you already do",
    text: "Pay a few different people, buy a gift card, pay a friend by tap. Each one is an offer that only verified Seeker owners can claim, and every offer pays out in SKR.",
  },
  {
    kicker: "Tap to pay",
    title: "Pay by touching phones",
    text: "Hold your Seeker near another phone and the pay sheet opens by itself. Pick the wallet, approve, done. There is no address to type and no code to scan.",
  },
  {
    kicker: "Scratch cards",
    title: "Earn SKR when you pay",
    text: "A payment from a verified Seeker can drop a scratch card. Scratch it to see what you won, and the SKR lands in your own wallet, not in a balance held by us.",
  },
  {
    kicker: "Free network fees",
    title: "Hold SKR, pay no gas",
    text: "Keep 1,000 SKR in your wallet and AirPay covers the network fee on what you send. You never need to keep SOL around just to make a payment.",
  },
];

function Duo() {
  const top = PHONE_AT === "top";
  const phone = <SeekerBack hang={top} className="relative z-10 mx-auto block" />;
  const fade = `linear-gradient(${top ? "to bottom" : "to top"}, #000 35%, transparent 96%)`;
  const beam = (
    <div className={top ? "mb-0" : "mt-10"} style={{ maskImage: fade, WebkitMaskImage: fade }}>
      <Beam down={top} className="relative block h-[clamp(130px,20svh,210px)] w-full" />
    </div>
  );
  return (
    <section id="earn" className="bg-white">
      <Container className="py-16 md:py-24">
        <Reveal className="mx-auto text-center">
          <SectionTag>For Seeker owners</SectionTag>
          <Heading className="mt-3">Seeker also unlocks</Heading>
        </Reveal>

        <div className="mt-10 md:mt-12">
          {top && (
            <>
              <div style={{ width: `${PHONE_SHARE * 100}%` }} className="mx-auto">{phone}</div>
              {beam}
            </>
          )}

          {/* Four short pieces of text and no pictures: the Seeker and its light are the picture.
              The light fades out as it opens (the mask on `Beam`), so it ends in the page and
              not in a hard edge under the words. */}
          <div className="mx-auto grid max-w-[980px] gap-x-20 gap-y-12 md:grid-cols-2 md:gap-y-16">
            {SEEKER_UNLOCKS.map((u, i) => (
              <Reveal key={u.kicker} delay={i * 90}>
                <p className="text-[15px] font-semibold text-blue-ink">{u.kicker}</p>
                <h3 className="mt-2 text-[24px] font-bold leading-[1.15] tracking-[-0.03em] md:text-[26px]">{u.title}</h3>
                <p className="mt-3 text-[17px] leading-[1.55] text-quiet">{u.text}</p>
              </Reveal>
            ))}
          </div>

          {!top && (
            <>
              {beam}
              <div style={{ width: `${PHONE_SHARE * 100}%` }} className="mx-auto">{phone}</div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

/**
 * The app's tap sheet, drawn small: the wallet that will pay held out above the sheet with the
 * contactless sign on it, then "Hold near to pay", the other linked wallets stacked under it,
 * and "Request instead". It is drawn here and is not a screenshot, so the addresses and the
 * balance are made up and nobody's real wallet is on the page.
 */
function TapSheet() {
  const stack = [
    { mark: "seeker", address: "7xKp…q3Fn", bg: "linear-gradient(180deg,#000000 0%,#012c3f 70%,#017f9f 100%)", ink: "#ffffff" },
    { mark: "phantom", address: "Bq2m…Wd8T", bg: "#9886e5", ink: "#ffffff" },
    { mark: "solflare", address: "Hn5v…c9Rz", bg: "#ffef47", ink: "#343433" },
  ];
  return (
    <div className="relative w-[236px] overflow-hidden rounded-[22px] bg-[#c9d3dd] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(25,28,33,0.08)]" role="img" aria-label="AirPay's tap sheet: a Backpack wallet card held out to pay, the words Hold near to pay, three more wallets stacked below, and a Request instead button">
      {/* The wallet in use, held out like a card over a terminal. */}
      <div className="mx-2 mt-3 flex h-[84px] flex-col justify-between rounded-[16px] bg-[#212122] p-2.5 text-white">
        <div className="flex items-center justify-between">
          <Image src="/app/ic_wallet_backpack.png" alt="" width={48} height={48} className="h-6 w-6 object-contain" />
          <span className="font-mono text-[10.5px]">Ck3t…m7Pa</span>
        </div>
        <div className="flex items-end justify-between">
          <span>
            <span className="block text-[10.5px] font-bold leading-tight">Backpack</span>
            <span className="block font-figure text-[16px] font-bold leading-tight tabular-nums">$24.10</span>
          </span>
          <span className="tap-pulse grid h-6 w-6 place-items-center rounded-full bg-white/15">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" aria-hidden>
              <path d="M6.5 8.5a5 5 0 0 1 0 7M10 6a8.5 8.5 0 0 1 0 12M13.5 3.5a12 12 0 0 1 0 17" />
            </svg>
          </span>
        </div>
      </div>

      {/* The sheet. */}
      <div className="relative mt-2.5 rounded-t-[20px] bg-white px-2 pb-11 pt-2">
        <div className="mx-auto h-[3px] w-7 rounded-full bg-line" />
        <p className="mt-2 text-center text-[14px] font-bold">Hold near to pay</p>
        <div className="relative mt-2 h-[92px]">
          {stack.map((c, i) => (
            <div key={c.mark} className="absolute inset-x-0 flex h-[64px] items-start justify-between rounded-[14px] px-2.5 pt-2" style={{ background: c.bg, color: c.ink, top: i * 26, zIndex: i }}>
              <Image src={`/app/ic_wallet_${c.mark}.png`} alt="" width={40} height={40} className="h-5 w-5 rounded-[5px] object-contain" />
              <span className="font-mono text-[10.5px]">{c.address}</span>
            </div>
          ))}
        </div>
        <span className="absolute inset-x-0 bottom-2.5 z-10 mx-auto grid h-8 w-[132px] place-items-center rounded-full bg-blue text-[12px] font-bold text-white shadow-[0_8px_18px_-8px_rgba(0,116,209,0.9)]">Request instead</span>
      </div>
    </div>
  );
}

/**
 * The pay sheet a tap opens, small enough to sit whole in a short card: who is being paid, how
 * much, the fee, and the button, with the contactless sign on its corner for the tap that
 * opened it. Nothing is cut off and nothing is scaled; it is set at this size.
 */
function MiniPaySheet({ ground }: { ground: string }) {
  return (
    <div className="relative w-[236px]" role="img" aria-label="AirPay's pay sheet after a tap: Pay dezloper.skr 12.00 USDC, network fee free, with a Confirm and pay button">
      {/* Ringed in the card's own colour, so the badge looks cut into the sheet's corner. */}
      <div className="absolute -right-2.5 -top-2.5 z-10 grid h-10 w-10 place-items-center rounded-full bg-blue" style={{ boxShadow: `0 0 0 4px ${ground}` }}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <path d="M6.5 8.5a5 5 0 0 1 0 7M10 6a8.5 8.5 0 0 1 0 12M13.5 3.5a12 12 0 0 1 0 17" />
        </svg>
      </div>
      <div className="rounded-[22px] bg-white p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="flex items-center gap-2.5">
          <Image src="/app/brand_seeker.png" alt="" width={72} height={72} className="h-9 w-9 rounded-full object-cover" />
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-bold leading-tight">Pay dezloper.skr</span>
            <span className="block font-mono text-[11px] leading-tight text-quiet">7xKp…q3Fn</span>
          </span>
        </div>
        <p className="mt-3 font-figure text-[30px] font-bold leading-none tracking-[-0.02em] tabular-nums">
          12.00 <span className="text-[14px] tracking-normal text-quiet">USDC</span>
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5 text-[12px]">
          <span className="text-quiet">Network fee</span>
          <span className="font-bold text-success-ink">Free</span>
        </div>
        <span className="mt-3 grid h-10 place-items-center rounded-[12px] bg-blue text-[14px] font-bold text-white">Confirm and pay</span>
      </div>
    </div>
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
          <SectionTag>From feedback</SectionTag>
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
          <SectionTag>The team</SectionTag>
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

/** The few things people ask first, answered in a line or two each. Every answer is true today. */
const FAQS: { q: string; a: string }[] = [
  {
    q: "Is AirPay safe?",
    a: "AirPay never holds your keys or your money. Every payment is approved in your own wallet and confirmed on Solana before the app says it is paid.",
  },
  {
    q: "Which wallets does it work with?",
    a: "Seeker Wallet, Phantom, Solflare and Backpack. You can connect more than one and switch the wallet you pay from at any time.",
  },
  {
    q: "Do I need a Solana Seeker?",
    a: "No. AirPay runs on Android phones too. Offers and scratch cards that pay SKR are for verified Seeker owners.",
  },
  {
    q: "What can I pay for?",
    a: "Phone recharges, bills and gift cards for 150+ services, paid in USDC or SOL. You can also pay any person by name, QR code or tap.",
  },
  {
    q: "Do I need SOL for network fees?",
    a: "No. The fee can come out of the USDC you already hold, and it is free for a wallet that holds 1,000 SKR.",
  },
];

/** Heading on the left, questions on the right. Plain `details`, so it opens without any script. */
function Faq() {
  return (
    <section id="faq" className="bg-white">
      <Container className="grid gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:py-24">
        <Reveal>
          <Heading>Frequently asked questions</Heading>
        </Reveal>
        <Reveal delay={90}>
          {FAQS.map((f) => (
            <details key={f.q} className="faq group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-[18px] font-medium leading-snug">
                <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-blue transition-transform duration-200 group-open:rotate-45" aria-hidden>
                  <path d="M8 1.500v13M1.500 8h13" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round" />
                </svg>
                {f.q}
              </summary>
              <p className="pb-6 pl-8 pr-4 text-[16px] leading-[1.6] text-quiet">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
