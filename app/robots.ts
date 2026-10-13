import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Everything may be read except the sign-up endpoint and the internal test sheet of drawings. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/art"] },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
