import Image from "next/image";
import logos from "@/lib/logos.json";

type Logo = { file: string; name: string };

/**
 * The names people know, in two stripes that drift opposite ways: the things paid for every day
 * (recharges, food, rides, streaming), then shopping and lifestyle.
 *
 * A chosen list, each brand once. The catalogue has several products for some brands, and
 * showing all of them repeated the same logo side by side.
 *
 * Each stripe is its list written out twice and slid by half its width, so the loop has no seam.
 * The second copy is hidden from screen readers, and the motion stops for anyone who has asked
 * their system for less of it: the stripes then sit still and can be scrolled by hand.
 */
const STRIPES: string[][] = [
  ["Airtel", "Jio Bundles", "Vi", "BSNL", "Tata Play", "Hotstar", "Amazon Prime Subscription", "Phonepe", "Swiggy Money", "Zomato", "Starbucks", "Subway", "Dominos", "KFC", "Pizza Hut", "Uber Vouchers", "MakeMyTrip", "BookMyShow", "Google Play", "Hindustan Petroleum"],
  ["Flipkart", "Myntra", "AJIO", "Tata Cliq Fashion", "Nykaa", "IKEA", "Croma", "Decathlon", "Tanishq Gold Coin", "Titan", "Taj Hotels", "Shoppers Stop", "Westside", "Levis", "Bata", "App Store & iTunes", "Steam", "Xbox", "PVR Cinemas", "Bigbasket"],
];

export function LogoWall() {
  const byName = new Map((logos as Logo[]).map((l) => [l.name, l]));
  const rows = STRIPES.map((names) => names.map((n) => byName.get(n)).filter((l): l is Logo => !!l));
  return (
    <div className="flex flex-col gap-5" aria-label="Logos of well-known services you can pay with AirPay">
      {rows.map((row, i) => (
        <div key={i} className="logo-row overflow-x-auto [scrollbar-width:none]">
          <ul className={`logo-track flex w-max gap-5 ${i % 2 ? "logo-track-reverse" : ""}`} style={{ animationDuration: `${row.length * 3.4}s` }}>
            {[...row, ...row].map((logo, j) => (
              <li
                key={`${logo.file}-${j}`}
                aria-hidden={j >= row.length}
                className="h-[112px] w-[112px] shrink-0 overflow-hidden rounded-[26px] border border-line bg-[#f8f8f8] md:h-[132px] md:w-[132px]"
              >
                <Image src={`/logos/${logo.file}`} alt={j < row.length ? logo.name : ""} width={264} height={264} className="h-full w-full object-contain" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
