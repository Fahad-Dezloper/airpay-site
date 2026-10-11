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
 * The pictures are in `public/logos/wall/`, one 320px tile per brand, made for this wall
 * (2026-10-11): each logo was fetched whole from the catalogue's image source — padded, not
 * cropped to a square, which is what cut the old ones — then set in the middle of its tile with
 * the same room round it as every other. A logo drawn in white comes on its brand's own colour;
 * the rest are on white. So a card only has to show its tile edge to edge.
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
    <div className="flex flex-col gap-2" aria-label="Logos of well-known services you can pay with AirPay">
      {rows.map((row, i) => (
        <div key={i} className="logo-row overflow-x-auto py-1.5 [scrollbar-width:none]">
          <ul className={`logo-track flex w-max gap-5 ${i % 2 ? "logo-track-reverse" : ""}`} style={{ animationDuration: `${row.length * 3.4}s` }}>
            {[...row, ...row].map((logo, j) => (
              <li
                key={`${logo.file}-${j}`}
                aria-hidden={j >= row.length}
                className="h-[112px] w-[112px] shrink-0 overflow-hidden rounded-[26px] bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:h-[132px] md:w-[132px]"
              >
                <Image src={`/logos/wall/${logo.file}`} alt={j < row.length ? logo.name : ""} width={320} height={320} className="h-full w-full object-cover" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
