import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Header } from "@/components/Chrome";
import { Container, SectionTag } from "@/components/ui";
import { site } from "@/lib/site";

/**
 * Terms of use for the AirPay recharge app, in plain words. They describe how the app actually
 * works (tap/server/duffleserver/topups.py): the order, the exact USDC payment, delivery by
 * Cryptorefills or Bitrefill, and refunds through them. Change this page when that changes.
 */

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms for using AirPay to recharge prepaid phones with USDC.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "19 November 2026";

export default function Terms() {
  return (
    <>
      <Header />
      <main>
        <Container className="pb-20 pt-[132px] md:pb-28 md:pt-[168px]">
          <article className="mx-auto max-w-[720px]">
            <SectionTag>Terms</SectionTag>
            <h1 className="mt-4 text-[40px] font-bold leading-[1.05] tracking-[-0.04em] md:text-[56px]">Terms of use</h1>
            <p className="mt-4 text-[15px] text-quiet">Last updated {UPDATED}</p>

            <Lead>
              AirPay is an app for recharging prepaid phones with USDC on Solana. By using it you agree to these terms.
              If you do not agree, please do not use AirPay.
            </Lead>

            <Part title="What AirPay does">
              <List
                items={[
                  "AirPay finds the network for a phone number, shows its plans, and places your order with a recharge provider: Cryptorefills or Bitrefill.",
                  "You pay the exact USDC amount shown, from your own Solana wallet, to the payment address for that order. The network fee is a small amount of SOL from your wallet.",
                  "The provider delivers the recharge to the phone number. AirPay shows the order's status and tells you when it is done.",
                  "AirPay charges no fee of its own. The price you see is the provider's price.",
                ]}
              />
            </Part>

            <Part title="Your wallet and your money">
              <List
                items={[
                  "AirPay never holds your keys or your money. Every payment is approved by you in your wallet app.",
                  "You are responsible for your wallet, its keys and its security.",
                  "Payments on Solana are final. Once sent, a payment cannot be reversed by us or anyone else.",
                ]}
              />
            </Part>

            <Part title="Before you pay">
              <List
                items={[
                  "Check the phone number, network and plan. A recharge sent to a wrong number you entered usually cannot be taken back.",
                  "Some plans only work on numbers that already have an active plan, or only in certain regions. The plan's details say so when the provider tells us.",
                  "Pay the exact amount before the order's payment time runs out. A payment that is late, short or sent twice is handled by the provider under its own rules, and may need you to contact support.",
                  "Enter an email you can read. Your receipt, updates and any refund are sent there.",
                ]}
              />
            </Part>

            <Part title="If a recharge does not go through">
              <List
                items={[
                  "Sometimes the network refuses a recharge. When that happens the order shows Failed or Refunded.",
                  "Refunds are made by the provider that took the order, not by AirPay. Cryptorefills refunds to your wallet; Bitrefill emails you, and you may need to follow its link to claim the refund.",
                  "For small recharges, AirPay asks you to confirm the recharge reached your phone before calling it successful. If you do not answer, it is marked successful after a day, unless the provider reports a problem first.",
                  "If something looks wrong, tap Help on the order or email us. We will help you reach a refund where one is due.",
                ]}
              />
            </Part>

            <Part title="Using AirPay fairly">
              <List
                items={[
                  "You must be 18 or older.",
                  "Do not use AirPay for anything illegal, with money that is not yours, or to get around sanctions or the law where you live.",
                  "Do not try to break, overload or misuse the app or our server.",
                  "We may refuse or stop an order, or stop serving a wallet, to prevent fraud or abuse, or when the law requires it.",
                ]}
              />
            </Part>

            <Part title="Availability and limits">
              <p className="text-[16px] leading-[1.6] text-quiet">
                AirPay is provided as it is. Plans, prices, countries and networks come from the providers and can
                change or stop at any time. We work to keep AirPay running and correct, but we cannot promise it will
                always be available or free of mistakes. As far as the law allows, we are not liable for indirect
                losses, or for more than the amount you paid for the order in question. Nothing here takes away rights
                you have by law as a consumer.
              </p>
            </Part>

            <Part title="Other services">
              <p className="text-[16px] leading-[1.6] text-quiet">
                Your wallet app, Solana, Cryptorefills and Bitrefill are run by others, under their own terms. How we
                handle your information is in our{" "}
                <a href="/privacy" className="font-medium text-blue-ink underline underline-offset-4">privacy policy</a>.
              </p>
            </Part>

            <Part title="Changes and contact">
              <p className="text-[16px] leading-[1.6] text-quiet">
                If these terms change, we will update this page and the date at the top. Using AirPay after that means
                you accept the new terms. Questions:{" "}
                <a href="mailto:airpayhq@gmail.com" className="font-medium text-blue-ink underline underline-offset-4">
                  airpayhq@gmail.com
                </a>{" "}
                or{" "}
                <a href={site.twitterUrl} target="_blank" rel="noreferrer" className="font-medium text-blue-ink underline underline-offset-4">
                  @airpayhq
                </a>{" "}
                on X.
              </p>
            </Part>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-8 text-[19px] leading-[1.6] text-ink">{children}</p>;
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
