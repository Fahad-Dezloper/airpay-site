/**
 * The few things about this site that are not design: where its buttons go.
 *
 * `appUrl` is where "Get the app" sends people: the newest APK on the project's GitHub releases.
 * Set NEXT_PUBLIC_APP_URL to the dApp Store listing once there is one.
 */
export const site = {
  name: "AirPay",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://github.com/Fahad-Dezloper/AirPay/releases/latest/download/AirPay.apk",
  // The address search engines should treat as the real one. The bare domain redirects here.
  url: "https://www.airpayy.com",
  twitter: "@airpayhq",
  // PostHog project key, shared with the app. Public by design: it can only send events, and it
  // ships in every page anyway. NEXT_PUBLIC_POSTHOG_KEY overrides it; "off" switches analytics off.
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "phc_BWFdEGHvJMxz4vVvv9Fif2nZes8eWMoi6UDu5n2AvDNy",
  repoUrl: "https://github.com/Fahad-Dezloper/AirPay",
  twitterUrl: "https://x.com/airpayhq",
};
