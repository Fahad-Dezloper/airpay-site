import type { Metadata } from "next";
import { Footer, Header } from "@/components/Chrome";
import { Reveal } from "@/components/Reveal";
import { Container, SectionTag } from "@/components/ui";

/**
 * The changelog: what is coming, then what is already in the app.
 *
 * "Coming next" is what the first users asked for. None of it is in the app yet and the page
 * says so on every row. No dates are given, because none are promised.
 */

export const metadata: Metadata = {
  title: "Changelog",
  description: "What is coming next in AirPay, the app for paying bills and spending crypto on Solana, and what is in the app today.",
  alternates: { canonical: "/changelog" },
  openGraph: { title: "Changelog · AirPay", description: "What is coming next in AirPay, and what is in the app today.", url: "/changelog" },
};

const COMING = [
  { title: "Automatic saving", text: "Put a little aside on a schedule, like an SIP." },
  { title: "AI credits", text: "Buy credits for Claude and other AI models." },
  { title: "eSIMs", text: "Buy and manage eSIMs for travel." },
  { title: "Auto-pay", text: "Recharges and subscriptions that renew themselves." },
  { title: "A private payment ID", text: "Get paid without showing your wallet address." },
  { title: "Split bills and reminders", text: "Share a bill with friends and nudge whoever has not paid." },
];

const SHIPPED = [
  { title: "Bills, recharges and gift cards", text: "150+ services, paid in USDC or SOL." },
  { title: "Pay anyone", text: "By .skr, .sol or .air name, or by scanning a Solana Pay QR code." },
  { title: "Tap to pay", text: "Touch two phones together and the pay sheet opens." },
  { title: "Every wallet in one place", text: "Seeker Wallet, Phantom, Solflare and Backpack, with one QR for all of them." },
  { title: "Offers and scratch cards", text: "SKR rewards for verified Seeker owners, paid to their own wallet." },
  { title: "Buy SKR", text: "Swap any token you hold for SKR inside the app." },
  { title: "Free network fees", text: "No gas for a wallet that holds 1,000 SKR." },
];

export default function Changelog() {
  return (
    <>
      <Header />
      <main>
        <Container className="pb-16 pt-[132px] md:pb-24 md:pt-[168px]">
          <Reveal className="max-w-[720px]">
            <SectionTag>Changelog</SectionTag>
            <h1 className="mt-4 text-[40px] font-bold leading-[1.05] tracking-[-0.04em] md:text-[64px]">What is coming next</h1>
            <p className="mt-5 max-w-[560px] text-[18px] leading-[1.55] text-quiet">
              AirPay is in private beta with a small circle of people who earn on-chain. This is what they asked for.
              None of it is in the app yet.
            </p>
          </Reveal>

          <List items={COMING} tag="Planned" />

          <Reveal className="mt-16 md:mt-24">
            <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.03em] md:text-[40px]">In the app today</h2>
          </Reveal>
          <List items={SHIPPED} tag="Live" live />
        </Container>
      </main>
      <Footer />
    </>
  );
}

function List({ items, tag, live = false }: { items: { title: string; text: string }[]; tag: string; live?: boolean }) {
  return (
    <ul className="mt-8 max-w-[860px] border-t border-line md:mt-10">
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} delay={i * 50} className="flex items-start justify-between gap-5 border-b border-line py-5">
          <div>
            <h3 className="text-[19px] font-bold leading-tight tracking-[-0.02em]">{it.title}</h3>
            <p className="mt-1.5 text-[16px] leading-[1.5] text-quiet">{it.text}</p>
          </div>
          <span className={`mt-0.5 shrink-0 rounded-full px-3 py-1 text-[13px] font-bold ${live ? "bg-[#e6f6ec] text-success-ink" : "bg-mist text-quiet"}`}>{tag}</span>
        </Reveal>
      ))}
    </ul>
  );
}
