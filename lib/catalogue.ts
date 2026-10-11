/**
 * How many services the app can pay for right now.
 *
 * The number comes from the same catalogue the app reads (`/v1/shop` on the AirPay server), so the
 * site cannot drift from the product. Set AIRPAY_SERVER_URL to the server's address and the page
 * asks it, at most once an hour. Without that, or if the server does not answer, the figures
 * below are used: they were counted from the live catalogue on the date in `asOf`.
 *
 * `kinds` is the app's own category filter on its More page, with the count each showed on that
 * date. A service can be in none of them, so they do not add up to the total.
 */
export type Counts = { total: number; asOf: string; live: boolean };

const COUNTED: Counts = { total: 158, asOf: "5 October 2026", live: false };

export const kinds: { name: string; count: number }[] = [
  { name: "Clothes", count: 51 },
  { name: "Food", count: 22 },
  { name: "Shopping", count: 13 },
  { name: "Travel", count: 11 },
  { name: "Games", count: 6 },
  { name: "Experiences", count: 4 },
  { name: "Streaming", count: 2 },
];

export async function serviceCounts(): Promise<Counts> {
  const base = process.env.AIRPAY_SERVER_URL;
  if (!base) return COUNTED;
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/v1/shop`, { next: { revalidate: 3600 } });
    if (!res.ok) return COUNTED;
    const data = (await res.json()) as { sections?: { products?: unknown[] }[] };
    const total = (data.sections ?? []).reduce((n, s) => n + (s.products?.length ?? 0), 0);
    if (total === 0) return COUNTED;
    const today = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
    return { total, asOf: today, live: true };
  } catch {
    return COUNTED;
  }
}
