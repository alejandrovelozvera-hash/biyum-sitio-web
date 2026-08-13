import { Project, Category } from "@/types";

export const demoCategories: Category[] = [
  { id: "1", name: "Fotografía", slug: "fotografia", order_index: 1 },
  { id: "2", name: "Branding", slug: "branding", order_index: 2 },
  { id: "3", name: "Video", slug: "video", order_index: 3 },
];

export const demoProjects: Project[] = [
  {
    id: "demo-1", title: "Luca Pizzeria", slug: "luca-pizzeria",
    description: "Campaña fotográfica gastronómica para Luca Pizzeria. Capturamos la esencia de la cocina italiana con imágenes que despiertan los sentidos.",
    category: "fotografia",
    cover_image_url: "https://picsum.photos/seed/pizza/1200/800", cover_image_id: null,
    images: [
      { id: 1, url: "https://picsum.photos/seed/pizza1/1200/800", thumb: "https://picsum.photos/seed/pizza1/400/300", alt: "Pizza artesanal", width: 1200, height: 800 },
      { id: 2, url: "https://picsum.photos/seed/pizza2/1200/800", thumb: "https://picsum.photos/seed/pizza2/400/300", alt: "Interior del restaurante", width: 1200, height: 800 },
    ],
    video_url: null, client: "Luca Pizzeria", year: "2024", services: ["Fotografía Gastronómica"], featured: true, order_index: 0, created_at: "2024-07-01", updated_at: "2024-07-01",
  },
  {
    id: "demo-2", title: "IVEZ", slug: "ivez",
    description: "Identidad visual completa para IVEZ, una marca de ropa urbana. Diseñamos desde el logotipo hasta la estrategia de redes.",
    category: "branding",
    cover_image_url: "https://picsum.photos/seed/ivez/1200/800", cover_image_id: null,
    images: [
      { id: 3, url: "https://picsum.photos/seed/ivez1/1200/800", thumb: "https://picsum.photos/seed/ivez1/400/300", alt: "Logo IVEZ", width: 1200, height: 800 },
    ],
    video_url: null, client: "IVEZ", year: "2024", services: ["Branding", "Diseño Gráfico"], featured: false, order_index: 1, created_at: "2024-06-15", updated_at: "2024-06-15",
  },
  {
    id: "demo-3", title: "Bomba Frutal", slug: "bomba-frutal",
    description: "Estrategia de social media y contenido visual para Bomba Frutal, una marca de jugos naturales.",
    category: "social-media",
    cover_image_url: "https://picsum.photos/seed/frutal/1200/800", cover_image_id: null,
    images: [
      { id: 4, url: "https://picsum.photos/seed/frutal1/1200/800", thumb: "https://picsum.photos/seed/frutal1/400/300", alt: "Jugo natural", width: 1200, height: 800 },
    ],
    video_url: null, client: "Bomba Frutal", year: "2024", services: ["Social Media", "Fotografía"], featured: false, order_index: 2, created_at: "2024-05-20", updated_at: "2024-05-20",
  },
  {
    id: "demo-4", title: "Universidad para el Futuro", slug: "universidad-para-el-futuro",
    description: "Campaña de branding y comunicación visual para una institución educativa innovadora.",
    category: "branding",
    cover_image_url: "https://picsum.photos/seed/universidad/1200/800", cover_image_id: null,
    images: [
      { id: 5, url: "https://picsum.photos/seed/universidad1/1200/800", thumb: "https://picsum.photos/seed/universidad1/400/300", alt: "Identidad universidad", width: 1200, height: 800 },
    ],
    video_url: null, client: "Universidad para el Futuro", year: "2023", services: ["Branding", "Diseño Web"], featured: false, order_index: 3, created_at: "2023-12-10", updated_at: "2023-12-10",
  },
  {
    id: "demo-5", title: "Fase Matiz", slug: "fase-matiz",
    description: "Producción audiovisual y fotografía de producto para Fase Matiz, una marca de pinturas.",
    category: "video",
    cover_image_url: "https://picsum.photos/seed/matiz/1200/800", cover_image_id: null,
    images: [
      { id: 6, url: "https://picsum.photos/seed/matiz1/1200/800", thumb: "https://picsum.photos/seed/matiz1/400/300", alt: "Producto Fase Matiz", width: 1200, height: 800 },
    ],
    video_url: null, client: "Fase Matiz", year: "2023", services: ["Video", "Fotografía de Producto"], featured: false, order_index: 4, created_at: "2023-11-05", updated_at: "2023-11-05",
  },
  {
    id: "demo-6", title: "Learn To Pic", slug: "learn-to-pic",
    description: "Taller de fotografía. Diseñamos la identidad visual y el material promocional.",
    category: "branding",
    cover_image_url: "https://picsum.photos/seed/learn/1200/800", cover_image_id: null,
    images: [
      { id: 7, url: "https://picsum.photos/seed/learn1/1200/800", thumb: "https://picsum.photos/seed/learn1/400/300", alt: "Learn To Pic branding", width: 1200, height: 800 },
    ],
    video_url: null, client: "Learn To Pic", year: "2023", services: ["Branding", "Diseño Gráfico"], featured: false, order_index: 5, created_at: "2023-10-01", updated_at: "2023-10-01",
  },
  {
    id: "demo-7", title: "Maki", slug: "maki",
    description: "Fotografía gastronómica para el menú de Maki, restaurante de comida asiática.",
    category: "fotografia",
    cover_image_url: "https://picsum.photos/seed/maki/1200/800", cover_image_id: null,
    images: [
      { id: 8, url: "https://picsum.photos/seed/maki1/1200/800", thumb: "https://picsum.photos/seed/maki1/400/300", alt: "Sushi Maki", width: 1200, height: 800 },
    ],
    video_url: null, client: "Maki Sushi", year: "2023", services: ["Fotografía Gastronómica"], featured: false, order_index: 6, created_at: "2023-08-15", updated_at: "2023-08-15",
  },
];

export const demoHeroSlides = [
  {
    image_url: "https://picsum.photos/seed/biyum1/1920/1080",
    title: "Fotografía Publicitaria",
    subtitle: "Destaca tu marca con imágenes que hablan por sí solas.",
    cta_text: "Escríbenos",
    cta_link: "https://wa.me/message/N3PW46LKUALOK1",
  },
  {
    image_url: "https://picsum.photos/seed/biyum2/1920/1080",
    title: "Fotografía Gastronómica",
    subtitle: "Potencia tu menú con imágenes de alta calidad.",
    cta_text: "Escríbenos",
    cta_link: "https://wa.me/message/N3PW46LKUALOK1",
  },
  {
    image_url: "https://picsum.photos/seed/biyum3/1920/1080",
    title: "Branding & Diseño",
    subtitle: "Creamos identidades visuales que conectan.",
    cta_text: "Ver Portafolio",
    cta_link: "/#portafolio",
  },
];

export const demoVideos = [
  {
    id: "vid-1",
    title: "Documental: Chambo Pobre y Fecundo",
    description: "Explora la realidad de Chambo y los tradicionales ladrilleros.",
    youtubeId: "qyjZxlPQSZI",
    category: "Documental",
  },
  {
    id: "vid-2",
    title: "Sisay Pacha - Fiesta del Carnaval y el Florecimiento",
    description: "Sisaypacha es una celebración ancestral de los pueblos indígenas andinos.",
    youtubeId: "pwWVLN0QHA4",
    category: "Documental",
  },
];
