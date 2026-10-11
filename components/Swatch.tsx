"use client";

import { useState } from "react";

/**
 * A colour that copies its own hex when pressed, and says so.
 *
 * It is a button, so it takes the keyboard and shows a focus ring like any other. "Copied" is
 * put in a live region, so a screen reader hears it as well as a reader seeing it.
 */
export function Swatch({
  name,
  hex,
  rgb,
  role,
  dark,
  large = false,
  bordered = false,
}: {
  name: string;
  hex: string;
  rgb?: string;
  role: string;
  /** True when the colour needs white words on it; false for ink. */
  dark: boolean;
  large?: boolean;
  bordered?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // No clipboard (an old browser, or a page not served securely): the hex is on the tile to read.
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${name}, ${hex}. Copy the hex`}
      className={`group flex w-full flex-col justify-between rounded-[24px] p-5 text-left transition-transform duration-200 hover:-translate-y-1 active:scale-[0.98] ${large ? "min-h-[200px]" : "min-h-[128px]"} ${bordered ? "border border-line" : ""}`}
      style={{ background: hex, color: dark ? "#ffffff" : "#343433" }}
    >
      <span className="flex items-start justify-between gap-3">
        <span className={`font-bold tracking-[-0.02em] ${large ? "text-[22px]" : "text-[17px]"}`}>{name}</span>
        <span aria-live="polite" className="text-[13px] font-bold">
          {copied ? "Copied" : <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">Copy</span>}
        </span>
      </span>
      <span>
        <span className="block font-mono text-[15px] font-medium">{hex}</span>
        {rgb && <span className="block font-mono text-[13px]">{rgb}</span>}
        <span className={`mt-2 block leading-snug ${large ? "text-[14px]" : "text-[13px]"}`}>{role}</span>
      </span>
    </button>
  );
}
