import type { NextConfig } from "next";

// Website analytics go through this site so ad blockers do not drop them (instrumentation-client.ts).
const ph = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";

const nextConfig: NextConfig = {
  // PostHog's paths end in a slash; without this Next would redirect them and lose the request.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: "/relay-ph/static/:path*", destination: `https://${ph}-assets.i.posthog.com/static/:path*` },
      { source: "/relay-ph/array/:path*", destination: `https://${ph}-assets.i.posthog.com/array/:path*` },
      { source: "/relay-ph/:path*", destination: `https://${ph}.i.posthog.com/:path*` },
    ];
  },
  // Lets a phone on the same wifi load the dev server's scripts, so the page can be looked at
  // on a real device. Development only; it has no effect on a build.
  allowedDevOrigins: ["192.168.1.*"],
};

export default nextConfig;
