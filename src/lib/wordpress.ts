import { WpMediaItem } from '@/types'

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://biyum.agency'

interface WpMediaRaw {
  id?: number
  title?: { rendered?: string }
  source_url?: string
  alt_text?: string
  media_details?: {
    width?: number
    height?: number
    sizes?: {
      thumbnail?: { source_url?: string }
      medium?: { source_url?: string }
    }
  }
}

const mapMediaItem = (item: WpMediaRaw): WpMediaItem => ({
  id: item.id ?? 0,
  title: item.title?.rendered || '',
  url: item.source_url || '',
  thumb: item.media_details?.sizes?.thumbnail?.source_url || item.source_url || '',
  medium: item.media_details?.sizes?.medium?.source_url || item.source_url || '',
  alt: item.alt_text || '',
  width: item.media_details?.width || 0,
  height: item.media_details?.height || 0,
})

export async function fetchWpMedia(page = 1, perPage = 50): Promise<WpMediaItem[]> {
  try {
    const url = `${WP_URL}/wp-json/wp/v2/media?page=${page}&per_page=${perPage}&_embed`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data: WpMediaRaw[] = await res.json()
    return data.map(mapMediaItem)
  } catch {
    return []
  }
}

export async function fetchWpMediaById(id: number): Promise<WpMediaItem | null> {
  try {
    const url = `${WP_URL}/wp-json/wp/v2/media/${id}?_embed`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const item: WpMediaRaw = await res.json()
    return mapMediaItem(item)
  } catch {
    return null
  }
}

export function getWpImageUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${WP_URL}${path}`
}
