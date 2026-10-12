"use client";

import { useEffect, useRef } from "react";
import { SectionTag } from "@/components/ui";

/**
 * The "Meet AirPay" label. It belongs just above its section's heading, like every other
 * section's label, and that is where it sits in the page. But at the top of the page that place
 * is under the fold, so it is lifted to the foot of the screen, just above the floating button,
 * where it says there is more below. As the page scrolls the heading comes up to meet it; once
 * its own place has risen that far it stops being lifted and simply stays there.
 *
 * `LIFT` is how far above the screen's foot it waits: the floating button, and a little air.
 */
const LIFT = 98;

export function MeetLabel() {
  const place = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const set = () => {
      if (!place.current || !label.current) return;
      const own = place.current.getBoundingClientRect();
      const waiting = window.innerHeight - LIFT - own.height;
      label.current.style.transform = own.top > waiting ? `translateY(${waiting - own.top}px)` : "";
    };
    set();
    window.addEventListener("scroll", set, { passive: true });
    window.addEventListener("resize", set);
    return () => {
      window.removeEventListener("scroll", set);
      window.removeEventListener("resize", set);
    };
  }, []);

  return (
    <div ref={place}>
      <div ref={label} className="will-change-transform">
        <SectionTag>Meet AirPay</SectionTag>
      </div>
    </div>
  );
}
