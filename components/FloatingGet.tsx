"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * "Get the app", floating at the foot of the screen for the whole page.
 *
 * It is a full pill with its words at the top of the page (over the hero) and again at the very
 * bottom, where it comes to rest inside the footer's box on the "Building" badge's line. In between it shrinks to the mark alone, so it stays out
 * of the way of what is being read, and opens again while it is hovered or focused.
 */
export function FloatingGet() {
  const [atEnds, setAtEnds] = useState(true);
  const [over, setOver] = useState(false);
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let top = true;
    let foot = false;
    const set = () => setAtEnds(top || foot);
    const dock = document.querySelector<HTMLElement>("[data-get-dock]");
    const onScroll = () => {
      top = window.scrollY < 120;
      set();
      // Once the footer's resting place has come up to where the button floats, the button
      // stops floating and rides up with it, so it ends in the footer's box and not over it.
      const el = holder.current;
      if (!el || !dock) return;
      const r = dock.getBoundingClientRect();
      const rest = r.top + r.height / 2;
      const floating = el.offsetTop + el.offsetHeight / 2;
      el.style.transform = rest < floating ? `translateY(${rest - floating}px)` : "";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const footer = document.querySelector("footer");
    const seen = footer
      ? new IntersectionObserver(([e]) => {
          foot = e.isIntersecting;
          set();
        }, { threshold: 0.35 })
      : null;
    if (footer && seen) seen.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      seen?.disconnect();
    };
  }, []);

  const open = atEnds || over;
  return (
    <div ref={holder} className="pointer-events-none fixed inset-x-0 bottom-[calc(20px+env(safe-area-inset-bottom,0px))] z-40 flex justify-center">
      <a
        href={site.appUrl}
        aria-label="Get the app"
        onMouseEnter={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onFocus={() => setOver(true)}
        onBlur={() => setOver(false)}
        className="pointer-events-auto flex h-[58px] items-center rounded-full bg-blue px-[13px] text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      >
        <Image src="/brand/mark-on-blue.svg" alt="" width={64} height={64} className="h-8 w-8 shrink-0 object-contain" />
        <span
          className="overflow-hidden whitespace-nowrap text-[18px] font-bold transition-[max-width,opacity,padding] duration-300 ease-out motion-reduce:transition-none"
          style={{ maxWidth: open ? 160 : 0, opacity: open ? 1 : 0, paddingLeft: open ? 10 : 0, paddingRight: open ? 10 : 0 }}
          aria-hidden
        >
          Get the app
        </span>
      </a>
    </div>
  );
}
