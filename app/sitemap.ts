import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "/",
      lastModified: "2026-07-03",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "/terms",
      lastModified: "2026-07-03",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "/privacy",
      lastModified: "2026-07-03",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "/refund",
      lastModified: "2026-07-03",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
