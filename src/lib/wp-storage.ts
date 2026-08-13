import { Project, Category, HeroSlide } from "@/types";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://biyum.agency";
const BASE = `${WP_URL}/wp-json/biyum/v1`;
const TOKEN = process.env.BIYUM_WP_TOKEN || "";

interface ConfigData {
  hero_slides: HeroSlide[];
  categories: Category[];
}

async function wpFetch<T>(path: string, init?: RequestInit, revalidate = 300): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      next: { revalidate },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function wpFetchWrite<T>(path: string, method: string, body: unknown): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-Biyum-Token": TOKEN,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getProjects(revalidate = 300): Promise<Project[]> {
  const data = await wpFetch<Project[]>(`/projects`, undefined, revalidate);
  return data && data.length ? data : [];
}

export async function getProjectByIdentifier(id: string, revalidate = 300): Promise<Project | null> {
  return wpFetch<Project>(`/projects/${encodeURIComponent(id)}`, undefined, revalidate);
}

export async function getCategories(revalidate = 300): Promise<Category[]> {
  const cfg = await wpFetch<ConfigData>(`/config`, undefined, revalidate);
  return cfg?.categories || [];
}

export async function getHeroSlides(revalidate = 300): Promise<HeroSlide[]> {
  const cfg = await wpFetch<ConfigData>(`/config`, undefined, revalidate);
  return cfg?.hero_slides || [];
}

export async function getSiteConfig(revalidate = 300): Promise<ConfigData> {
  const cfg = await wpFetch<ConfigData>(`/config`, undefined, revalidate);
  return { hero_slides: cfg?.hero_slides || [], categories: cfg?.categories || [] };
}

export async function createProject(data: Partial<Project>): Promise<Project | null> {
  return wpFetchWrite<Project>(`/projects`, "POST", data);
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
  return wpFetchWrite<Project>(`/projects/${encodeURIComponent(id)}`, "PUT", data);
}

export async function deleteProject(id: string): Promise<boolean> {
  const data = await wpFetchWrite<{ success: boolean }>(`/projects/${encodeURIComponent(id)}`, "DELETE", {});
  return !!data?.success;
}

export async function saveSiteConfig(slides: HeroSlide[], categories: Category[]): Promise<boolean> {
  const data = await wpFetchWrite<{ success: boolean }>(`/config`, "PUT", { slides, categories });
  return !!data?.success;
}