import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Header } from "@/components/Chrome";
import { Container, SectionTag } from "@/components/ui";
import { site } from "@/lib/site";

/**
 * The privacy policy, in plain words.
 *
 * Every line describes what the code does today: what the server's database keeps
 * (tap/server/duffleserver/store.py), what the app keeps on the phone, which outside services
 * each part talks to, and what the website measures. If any of those change, change this page in
 * the same commit.
 */

export const metadata: Metadata = {
  title: "Privacy",
  description: "What AirPay collects, why, who it is shared with, and how to ask for it to be deleted.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "22 October 2026";

export default function Privacy() {
  return (
    <>
      <Header />
      <main>
        <Container className="pb-20 pt-[132px] md:pb-28 md:pt-[168px]">
          <article className="mx-auto max-w-[720px]">
            <SectionTag>Privacy</SectionTag>
            <h1 className="mt-4 text-[40px] font-bold leading-[1.05] tracking-[-0.04em] md:text-[56px]">Privacy policy</h1>
            <p className="mt-4 text-[15px] text-quiet">Last updated {UPDATED}</p>

            <Lead>
              AirPay never holds your keys or your money. Every payment is signed in your own wallet and settles on
              Solana. We collect as little as we can to make the app work, and we never sell it.
            </Lead>

            <Part title="What we never collect">
              <List
                items={[
                  "Your private keys or seed phrase. They stay in your wallet app.",
                  "Card numbers, bank details or passwords. AirPay has no password.",
                  "Your phone's contacts or location.",
                  "Pictures from your camera. The camera is only used to read a QR code, and nothing it sees is saved or sent.",
                ]}
              />
            </Part>

            <Part title="On this website">
              <List
                items={[
                  <>
                    <b>Your email, if you sign up for early access.</b> It is kept in a private spreadsheet we own, with
                    the time you signed up, and used only to tell you about AirPay.
                  </>,
                  <>
                    <b>Visits, without cookies.</b> We use PostHog to count visits: which pages are viewed, which links are
                    pressed, the site you came from, and your browser, device type and country. Nothing is stored in your
                    browser to do this, and what you type into the email field is never recorded.
                  </>,
                ]}
              />
            </Part>

            <Part title="In the app">
              <List
                items={[
                  <>
                    <b>The wallet addresses you connect.</b> Wallet addresses are public on Solana. We use them to sign
                    you in and to know which of your wallets belong together.
                  </>,
                  <>
                    <b>A sign-in signature.</b> To sign in, your wallet signs a one-time message. We check it and keep a
                    session, so you are not asked every time.
                  </>,
                  <>
                    <b>Your payments.</b> The payment&apos;s reference, amount, the two wallets and the transaction. All of
                    this is public on Solana already; we keep it to confirm the payment and show it in your history.
                  </>,
                  <>
                    <b>Your shop orders.</b> The order, its status and the code delivered to you, so the app can show it
                    to you. For a phone recharge, the number you enter is passed to Bitrefill to deliver it. Our server
                    does not keep it.
                  </>,
                  <>
                    <b>Rewards, offers and referrals.</b> What you earned, which offers you claimed, and who invited
                    whom, by wallet address, so rewards are paid once and to the right person.
                  </>,
                  <>
                    <b>Notes on payments and your name.</b> A note you attach to a request, and a name you pick (such as
                    a .air name), are kept so the other person can see them.
                  </>,
                  <>
                    <b>A notification token.</b> From Firebase, so we can tell you when a payment arrives or an order is
                    ready.
                  </>,
                  <>
                    <b>How the app is used.</b> We use PostHog to count things like how many people open the app, which
                    screens they visit, and how many connect a wallet or finish a payment, along with device model,
                    Android version and country. It is anonymous: it is not linked to your wallet address, your name or
                    your email, nothing you type is recorded, and the advertising ID is not collected.
                  </>,
                ]}
              />
              <p className="mt-4 text-[16px] leading-[1.6] text-quiet">
                Some things stay on your phone and are never sent to us: the list of people you have paid, your copy of
                your orders, and your settings.
              </p>
            </Part>

            <Part title="Who else sees it">
              <p className="text-[16px] leading-[1.6] text-quiet">
                We share only what each service needs to do its job, and we do not sell anything to anyone.
              </p>
              <List
                items={[
                  <><b>Solana.</b> Payments are recorded on a public blockchain, where anyone can see them, permanently.</>,
                  <><b>Bitrefill</b> sells and delivers recharges, bills and gift cards, and receives what an order needs.</>,
                  <><b>Jupiter</b> prices and carries out token swaps when you buy SKR.</>,
                  <><b>Helius</b> and other Solana data providers, which we ask about balances and payments.</>,
                  <><b>Google Firebase</b> for notifications.</>,
                  <><b>PostHog</b> for counting visits to this website and use of the app.</>,
                  <><b>Google Sheets</b> for the early-access list, and <b>Vercel</b>, which hosts this website.</>,
                ]}
              />
            </Part>

            <Part title="How long we keep it">
              <p className="text-[16px] leading-[1.6] text-quiet">
                For as long as you use AirPay, and for as long after that as we need to settle rewards and answer
                questions about orders. Your early-access email stays until you ask us to remove it. What is on Solana
                cannot be removed by us or anyone else.
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
                request, message us on X at{" "}
                <a href={site.twitterUrl} target="_blank" rel="noreferrer" className="font-medium text-blue-ink underline underline-offset-4">
                  @airpayhq
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
