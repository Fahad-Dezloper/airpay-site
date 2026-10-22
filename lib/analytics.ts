import posthog from "posthog-js";
import { site } from "@/lib/site";

/**
 * Named moments worth counting on the site. Never pass anything that identifies a person: no
 * email, no wallet address. Does nothing when analytics is off.
 */
export type SiteEvent = "waitlist_signed_up" | "get_app_clicked";

export function track(event: SiteEvent, where?: string) {
  if (!site.posthogKey || site.posthogKey === "off") return;
  posthog.capture(event, where ? { where } : undefined);
}
