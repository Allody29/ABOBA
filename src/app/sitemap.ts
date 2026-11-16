import type { MetadataRoute } from "next";
import { productGroups } from "@/data/products";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/catalog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contacts`, changeFrequency: "yearly", priority: 0.6 },
  ];
  const productPages: MetadataRoute.Sitemap = productGroups.map((g) => ({
    url: `${SITE_URL}/catalog/${g.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...pages, ...productPages];
}
