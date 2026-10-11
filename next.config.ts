import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the same wifi load the dev server's scripts, so the page can be looked at
  // on a real device. Development only; it has no effect on a build.
  allowedDevOrigins: ["192.168.1.*"],
};

export default nextConfig;
