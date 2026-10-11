import Image from "next/image";
import logos from "@/lib/logos.json";

type Logo = { file: string; name: string };

/**
 * Every service's own logo, in three rows that drift sideways.
 *
 * Each row is its list written out twice and slid by half its width, so the loop has no seam.
 * The second copy is hidden from screen readers, and the motion stops for anyone who has asked
 * their system for less of it: the rows then sit still and can be scrolled by hand.
 */
export function LogoWall() {
  const all = logos as Logo[];
  const size = Math.ceil(all.length / 3);
  const rows = [all.slice(0, size), all.slice(size, size * 2), all.slice(size * 2)];
  return (
    <div className="flex flex-col gap-4" aria-label={`Logos of ${all.length} services you can pay with AirPay`}>
      {rows.map((row, i) => (
        <div key={i} className="logo-row overflow-x-auto [scrollbar-width:none]">
          <ul className={`logo-track flex w-max gap-4 ${i % 2 ? "logo-track-reverse" : ""}`} style={{ animationDuration: `${row.length * 2.6}s` }}>
            {[...row, ...row].map((logo, j) => (
              <li
                key={`${logo.file}-${j}`}
                aria-hidden={j >= row.length}
                className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-line bg-[#f8f8f8]"
              >
                <Image src={`/logos/${logo.file}`} alt={j < row.length ? logo.name : ""} width={160} height={160} className="h-full w-full object-contain" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
