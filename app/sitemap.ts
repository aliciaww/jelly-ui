import type { MetadataRoute } from "next"

const siteUrl = "https://jelly-web-elements.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/readme`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/license`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ]
}
