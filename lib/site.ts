/**
 * The few things about this site that are not design: where its buttons go.
 *
 * `appUrl` is where "Get the app" sends people: the newest APK on the project's GitHub releases.
 * Set NEXT_PUBLIC_APP_URL to the dApp Store listing once there is one.
 */
export const site = {
  name: "AirPay",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://github.com/Fahad-Dezloper/AirPay/releases/latest/download/AirPay.apk",
  url: "https://airpayy.com",
  repoUrl: "https://github.com/Fahad-Dezloper/AirPay",
  twitterUrl: "https://x.com/airpayhq",
};
