export interface Project {
  id: string
  title: string
  slug: string
  description: string
  category: string
  cover_image_url: string
  cover_image_id: number | null
  images: ProjectImage[]
  video_url: string | null
  client: string | null
  year: string | null
  services: string[]
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface ProjectImage {
  id: number
  url: string
  thumb: string
  alt: string
  width: number
  height: number
}

export interface Category {
  id: string
  name: string
  slug: string
  order_index: number
}

export interface WpMediaItem {
  id: number
  title: string
  url: string
  thumb: string
  medium: string
  alt: string
  width: number
  height: number
  filename?: string
}

export interface SiteConfig {
  hero_slides: HeroSlide[]
  site_name: string
  tagline: string
  contact: {
    email: string
    phone: string
    whatsapp: string
    facebook: string
    instagram: string
    address: string
  }
}

export interface HeroSlide {
  id: string
  image_url: string
  title: string
  subtitle: string
  cta_text: string
  cta_link: string
  video_id?: string
  is_video?: boolean
  video_start?: number
  video_end?: number
}
