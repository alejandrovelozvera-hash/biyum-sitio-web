import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/wp-storage";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://biyum.agency";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#portafolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/#video`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/#info`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/chimbuceros`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  try {
    const projects = await getProjects(3600);
    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
      url: `${base}/proyecto/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
    return [...staticRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
