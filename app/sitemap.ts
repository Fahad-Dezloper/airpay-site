import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** The pages meant to be found. `/art` is a test sheet and is left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/brand`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
