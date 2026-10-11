import { Container, Heading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

/**
 * "Secure by design" (2026-10-11): the heading, a shield in the middle, and four short points
 * round it, two on each side. Few words on purpose. Every line is something the app does today.
 */
const POINTS: { title: string; text: string }[] = [
  { title: "AirPay never holds your keys", text: "Every payment is signed in your own wallet. There is nothing of yours for us to lose." },
  { title: "You see who you are paying", text: "A name always shows the end of its wallet address before you approve." },
  { title: "Paid means confirmed", text: "The green tick waits for Solana to confirm, so you are never asked to pay twice." },
  { title: "A tap carries no money", text: "Touching phones only passes who is asking and how much. Nothing in the air to steal." },
];

function Point({ title, text, side }: { title: string; text: string; side: "left" | "right" }) {
  return (
    <div className={`mx-auto max-w-[340px] text-center md:mx-0 ${side === "left" ? "md:ml-auto md:text-right" : "md:text-left"}`}>
      <h3 className="text-[21px] font-bold leading-tight tracking-[-0.02em]">{title}</h3>
      <p className="mt-2 text-[16px] leading-[1.5] text-quiet">{text}</p>
    </div>
  );
}

export function Secure() {
  const [a, b, c, d] = POINTS;
  return (
    <section id="secure" className="bg-white">
      <Container className="py-20 md:py-28">
        <Reveal className="text-center">
          <Heading>Secure by design</Heading>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 md:mt-16 md:grid-cols-[1fr_auto_1fr] md:gap-14">
          <Reveal className="order-2 grid gap-10 md:order-1 md:gap-20">
            <Point side="left" {...a} />
            <Point side="left" {...b} />
          </Reveal>

          <Reveal className="order-1 md:order-2" delay={80}>
            <Shield />
          </Reveal>

          <Reveal className="order-3 grid gap-10 md:gap-20" delay={160}>
            <Point side="right" {...c} />
            <Point side="right" {...d} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** The shield: the app's blue, a white tick, and two soft rings of the same blue round it. */
function Shield() {
  return (
    <div className="relative mx-auto grid h-[230px] w-[230px] place-items-center md:h-[290px] md:w-[290px]" aria-hidden>
      <span className="absolute inset-0 rounded-full bg-[#008fff]/[0.06]" />
      <span className="absolute inset-[13%] rounded-full bg-[#008fff]/[0.09]" />
      <svg viewBox="0 0 120 136" className="relative h-[46%] drop-shadow-[0_18px_22px_rgba(0,143,255,0.35)]">
        <defs>
          <linearGradient id="shield-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3aa9ff" />
            <stop offset="1" stopColor="#007be0" />
          </linearGradient>
        </defs>
        <path
          d="M60 4c15 10 31 14.500 48 14v46c0 31-18 53-48 68C30 117 12 95 12 64V18c17 .500 33-4 48-14Z"
          fill="url(#shield-body)"
          stroke="url(#shield-body)"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path d="M60 4c15 10 31 14.500 48 14v46c0 31-18 53-48 68Z" fill="#ffffff" fillOpacity="0.12" />
        <path d="M40 67l14 14 27-30" fill="none" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
