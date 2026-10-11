"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Brings its children up into place the first time they are scrolled to.
 *
 * It starts shown, and only hides what is still below the fold once the script is running, so
 * the page reads in full without it and nothing on the first screen ever blinks. `delay` staggers
 * siblings, in milliseconds.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    // Already on screen when the script wakes: leave it alone.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setShown(false);
    const seen = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          seen.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  return (
    <Tag
      // The three tags share the ref's shape closely enough; the cast keeps one component for all.
      ref={ref as never}
      data-shown={shown}
      className={`reveal ${className}`}
      style={{ ["--delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
