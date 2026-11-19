import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Header } from "@/components/Chrome";
import { Container, PrimaryButton, SecondaryButton, SectionTag } from "@/components/ui";
import { site } from "@/lib/site";

/**
 * The home page: the AirPay recharge app (1.1.0 onwards), what it does, how to get it, and its
 * terms and privacy policy. This is the "App Website" given to the Solana dApp Store (it was first
 * given as /recharge, which now redirects here). The earlier, wider AirPay site lives at /v1.
 */

export const metadata: Metadata = {
  title: { absolute: "AirPay: recharge any phone with USDC" },
  description:
    "AirPay recharges prepaid phones in 140+ countries, paid in USDC from your own Solana wallet. No AirPay fee.",
  alternates: { canonical: "/" },
};

const STEPS: [string, string][] = [
  ["Type the number", "AirPay finds the network from the number itself. You can always change it."],
  ["Pick a plan", "Every plan for that network, sorted by price, in the local money: ₹49, Rp7,650, ₦1,000."],
  ["Pay in USDC", "One transfer from your own wallet. Seeker Wallet, Phantom, Solflare and Backpack all work."],
  ["Done", "The recharge reaches the phone, usually in a minute or two, and AirPay tells you."],
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Container className="pb-20 pt-[132px] md:pb-28 md:pt-[168px]">
          <article className="mx-auto max-w-[720px]">
            <SectionTag>The app</SectionTag>
            <h1 className="mt-4 text-balance text-[40px] font-bold leading-[1.05] tracking-[-0.04em] md:text-[56px]">
              Recharge any phone with USDC
            </h1>
            <p className="mt-6 text-[19px] leading-[1.6] text-ink">
              AirPay tops up prepaid phones in 140+ countries, paid in USDC from the Solana wallet you already have. It
              never holds your money or your keys, and it charges no fee of its own.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href={site.appUrl}>Download for Android</PrimaryButton>
              <SecondaryButton href={`${site.repoUrl}/releases`}>All releases</SecondaryButton>
            </div>
            <p className="mt-3 text-[14px] text-quiet">
              Android 12 or newer. Built for the Solana Seeker. Looking for the earlier AirPay?{" "}
              <a href="/v1" className="font-medium text-blue-ink underline underline-offset-4">See AirPay v1</a>.
            </p>

            <Part title="How it works">
              <ol className="mt-3 grid gap-4">
                {STEPS.map(([title, text], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue text-[15px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[16px] leading-[1.6] text-quiet">
                      <b className="font-semibold text-ink">{title}.</b> {text}
                    </span>
                  </li>
                ))}
              </ol>
            </Part>

            <Part title="Good to know">
              <List
                items={[
                  <><b>Real money.</b> Recharges are paid in USDC on Solana mainnet. Try a small plan first.</>,
                  <><b>Delivered by Cryptorefills and Bitrefill.</b> Your email gets the receipt, updates and any refund.</>,
                  <><b>Clear statuses.</b> Awaiting payment, Processing, Confirming, Successful, Failed, Refunded.</>,
                  <><b>Help on every order.</b> Tap Help on an order, or email airpayhq@gmail.com.</>,
                ]}
              />
            </Part>

            <Part title="Terms and privacy">
              <p className="text-[16px] leading-[1.6] text-quiet">
                Read the{" "}
                <a href="/terms" className="font-medium text-blue-ink underline underline-offset-4">terms of use</a> and the{" "}
                <a href="/privacy" className="font-medium text-blue-ink underline underline-offset-4">privacy policy</a>.
                Support:{" "}
                <a href="mailto:airpayhq@gmail.com" className="font-medium text-blue-ink underline underline-offset-4">
                  airpayhq@gmail.com
                </a>
                .
              </p>
            </Part>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-[24px] font-bold leading-tight tracking-[-0.02em] md:text-[28px]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-3 grid gap-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[16px] leading-[1.6] text-quiet">
          <span aria-hidden className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
          <span className="[&_b]:font-semibold [&_b]:text-ink">{it}</span>
        </li>
      ))}
    </ul>
  );
}
