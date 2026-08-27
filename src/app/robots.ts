import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: "https://biyum.agency/sitemap.xml",
    host: "https://biyum.agency",
  };
}
