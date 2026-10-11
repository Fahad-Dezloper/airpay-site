"use client";

import { useState } from "react";

/**
 * "Be the first to know": one field and one button.
 *
 * It posts the address to this site's own `/api/waitlist`, which is what decides where it is
 * kept. Nothing is said to have been saved until that answers yes.
 */
export function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [why, setWhy] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setState("error");
      setWhy("That does not look like an email address.");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (res.ok) {
        setState("done");
      } else {
        setState("error");
        setWhy("We could not save that just now. Please try again.");
      }
    } catch {
      setState("error");
      setWhy("You seem to be offline. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <p role="status" className="inline-flex h-[60px] items-center gap-2.5 rounded-full bg-white px-7 text-[17px] font-bold text-ink shadow-[0_14px_34px_-16px_rgba(0,60,120,0.5)]">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-success text-white">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4.5 4.5L19 7" />
          </svg>
        </span>
        You are on the list. We will email you first.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex w-full max-w-[480px] flex-col items-center gap-3">
      <div className="flex h-[60px] w-full items-center rounded-full bg-white pl-6 pr-1.5 shadow-[0_14px_34px_-16px_rgba(0,60,120,0.5)] ring-1 ring-line focus-within:ring-2 focus-within:ring-blue">
        <label htmlFor="waitlist-email" className="sr-only">Your email address</label>
        <input
          id="waitlist-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
          className="h-full min-w-0 flex-1 bg-transparent text-[17px] font-medium text-ink outline-none placeholder:text-quiet"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="h-12 shrink-0 rounded-full bg-blue px-6 text-[16px] font-bold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-70"
        >
          {state === "sending" ? "Sending" : "Get early access"}
        </button>
      </div>
      {/* Only when something is wrong, and on white of its own: the glow behind this is blue. */}
      {state === "error" && (
        <p role="alert" className="rounded-full bg-white px-4 py-1.5 text-[14px] font-bold text-[#b3261e] shadow-[0_8px_20px_-12px_rgba(0,60,120,0.5)]">{why}</p>
      )}
    </form>
  );
}
