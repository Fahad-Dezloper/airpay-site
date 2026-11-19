import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Header } from "@/components/Chrome";
import { Container, SectionTag } from "@/components/ui";
import { site } from "@/lib/site";

/**
 * The privacy policy, in plain words.
 *
 * Every line describes what the code does today (AirPay 1.1.0, recharges only): what the server
 * keeps (tap/server/duffleserver/topups.py, support.py), what the app keeps on the phone, which
 * outside services each part talks to, and what the website measures. If any of those change, change this page in
 * the same commit.
 */

export const metadata: Metadata = {
  title: "Privacy",
  description: "What the AirPay recharge app collects, why, who it is shared with, and how to ask for it to be deleted.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "19 November 2026";

export default function Privacy() {
  return (
    <>
      <Header />
      <main>
        <Container className="pb-20 pt-[132px] md:pb-28 md:pt-[168px]">
          <article className="mx-auto max-w-[720px]">
            <SectionTag>Privacy</SectionTag>
            <h1 className="mt-4 text-[40px] font-bold leading-[1.05] tracking-[-0.04em] md:text-[56px]">Privacy policy</h1>
            <p className="mt-4 text-[15px] text-quiet">Last updated {UPDATED}. Covers the AirPay app from version 1.1.0 and this website.</p>

            <Lead>
              AirPay recharges prepaid phones, paid in USDC from your own Solana wallet. It never holds your keys or
              your money. We collect only what a recharge needs, share it only with the company that delivers the
              recharge, and never sell it.
            </Lead>

            <Part title="What we never collect">
              <List
                items={[
                  "Your private keys or seed phrase. They stay in your wallet app.",
                  "Card numbers, bank details or passwords. AirPay has no password.",
                  "Your phone's contacts, photos or location.",
                ]}
              />
            </Part>

            <Part title="In the app">
              <List
                items={[
                  <>
                    <b>Your wallet address.</b> Wallet addresses are public on Solana. To sign in, your wallet signs a
                    one-time message; we check it and keep a session so you are not asked every time.
                  </>,
                  <>
                    <b>Your recharges.</b> For each order: the phone number, its country and network, the plan, the USDC
                    amount, the payment address, the order&apos;s status and times, and your wallet address. We keep these
                    to deliver the recharge, show it in your history and answer questions about it.
                  </>,
                  <>
                    <b>Your email, for each order.</b> You enter it before paying. We pass it to the company delivering
                    the recharge, which sends your receipt, delivery updates and any refund there. Our server does not
                    store it with the order. If you tick &quot;Save this email&quot;, it is saved on your phone only.
                  </>,
                  <>
                    <b>Help requests.</b> When you ask for help with an order, we keep your email, your message and which
                    order it is about, and send them to our support inbox so we can reply.
                  </>,
                  <>
                    <b>A notification token.</b> From Google Firebase, so we can tell you when a recharge is done or did
                    not go through.
                  </>,
                  <>
                    <b>How the app is used.</b> We use PostHog to count things like how many people open the app, which
                    screens they visit and how many finish a recharge, with device model, Android version and country.
                    It is not linked to your wallet, phone number or email, nothing you type is recorded, and the
                    advertising ID is not collected.
                  </>,
                ]}
              />
            </Part>

            <Part title="On this website">
              <List
                items={[
                  <>
                    <b>Visits, without cookies.</b> PostHog counts which pages are viewed, which links are pressed, the
                    site you came from, and your browser, device type and country. Nothing is stored in your browser to
                    do this.
                  </>,
                  <>
                    <b>Your email, if you signed up for early access.</b> It is kept in a private spreadsheet with the
                    time you signed up, and used only to tell you about AirPay.
                  </>,
                ]}
              />
            </Part>

            <Part title="Who else sees it">
              <p className="text-[16px] leading-[1.6] text-quiet">
                We share only what each service needs to do its job, and we do not sell anything to anyone.
              </p>
              <List
                items={[
                  <>
                    <b>Cryptorefills</b> delivers most recharges. It receives the phone number, network and plan, your
                    email, and your IP address and app version, which it uses to prevent fraud.
                  </>,
                  <>
                    <b>Bitrefill</b> delivers small recharges. It receives the phone number, network and plan, your email,
                    and your wallet address so it can refund you if the recharge fails.
                  </>,
                  <><b>Solana.</b> Your payment is recorded on a public blockchain, where anyone can see it, permanently.</>,
                  <><b>Helius</b> and other Solana data providers, which we ask about payments.</>,
                  <><b>Google Firebase</b> for notifications, and <b>Gmail</b> for support emails.</>,
                  <><b>PostHog</b> for counting use of the app and visits to this website.</>,
                  <><b>Render</b>, which runs our server, and <b>Vercel</b>, which hosts this website.</>,
                ]}
              />
              <p className="mt-4 text-[16px] leading-[1.6] text-quiet">
                Cryptorefills and Bitrefill handle what they receive under their own privacy policies.
              </p>
            </Part>

            <Part title="How long we keep it">
              <p className="text-[16px] leading-[1.6] text-quiet">
                Orders and help requests are kept for as long as you use AirPay and for as long after that as we need
                to answer questions about them and meet legal duties. Your early-access email stays until you ask us to
                remove it. What is on Solana cannot be removed by us or anyone else.
              </p>
            </Part>

            <Part title="Your choices">
              <List
                items={[
                  "Ask us for a copy of what we hold about your wallet, or ask us to delete it.",
                  "Ask us to take your email off the early-access list.",
                  "Turn notifications off in your phone's settings at any time.",
                ]}
              />
            </Part>

            <Part title="Children">
              <p className="text-[16px] leading-[1.6] text-quiet">AirPay is not meant for anyone under 18.</p>
            </Part>

            <Part title="Changes and contact">
              <p className="text-[16px] leading-[1.6] text-quiet">
                If this policy changes, we will update this page and the date at the top. To ask a question or make a
                request, email{" "}
                <a href="mailto:airpayhq@gmail.com" className="font-medium text-blue-ink underline underline-offset-4">
                  airpayhq@gmail.com
                </a>{" "}
                or message us on X at{" "}
                <a href={site.twitterUrl} target="_blank" rel="noreferrer" className="font-medium text-blue-ink underline underline-offset-4">
                  @airpayhq
                </a>
                . See also our{" "}
                <a href="/terms" className="font-medium text-blue-ink underline underline-offset-4">terms of use</a>.
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
