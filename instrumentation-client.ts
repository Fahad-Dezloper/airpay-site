import posthog from "posthog-js";
import { site } from "@/lib/site";

/**
 * Website analytics (PostHog), started before the page is interactive.
 *
 * The key is `site.posthogKey` (the same project as the app). Set NEXT_PUBLIC_POSTHOG_KEY=off to
 * switch it off.
 *
 * Cookieless: nothing is stored in the visitor's browser, so there is no cookie banner. PostHog
 * counts unique visitors per day from a hash it makes on its own servers. ("Cookieless server
 * hash mode" has to be switched on in the PostHog project's settings for this to work.)
 *
 * Events go to this site's own `/relay-ph` path, which next.config.ts forwards to PostHog, so
 * ad blockers that block posthog.com do not silently drop them.
 */
const key = site.posthogKey === "off" ? "" : site.posthogKey;
const region = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";

if (key) {
  posthog.init(key, {
    api_host: "/relay-ph",
    ui_host: `https://${region}.posthog.com`,
    defaults: "2026-08-30",
    cookieless_mode: "always",
    // Never record what someone types, such as an email in the early-access field.
    session_recording: { maskAllInputs: true },
  });
}
