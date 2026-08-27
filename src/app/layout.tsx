import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  metadataBase: new URL("https://biyum.agency"),
  title: {
    default: "Biyum | Agencia de Diseño, Fotografía y Video en Riobamba",
    template: "%s | Biyum",
  },
  description:
    "Agencia creativa en Riobamba — fotografía publicitaria y gastronómica, producción de video, branding, social media y diseño web. Creamos marcas que destacan.",
  keywords: [
    "agencia diseño Riobamba",
    "agencia publicidad Riobamba",
    "fotografía publicitaria",
    "fotografía gastronómica",
    "producción de video",
    "branding Riobamba",
    "diseño gráfico Ecuador",
    "social media Riobamba",
    "diseño web Riobamba",
    "Biyum",
  ],
  authors: [{ name: "Biyum", url: "https://biyum.agency" }],
  creator: "Biyum",
  publisher: "Biyum",
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Biyum | Agencia de Diseño, Fotografía y Video en Riobamba",
    description:
      "Fotografía, video, branding y publicidad para tu marca. Historias reales que conectan — desde Riobamba para todo Ecuador.",
    url: "https://biyum.agency",
    siteName: "Biyum",
    locale: "es_EC",
    type: "website",
    images: [{ url: "https://wp.biyum.agency/wp-content/uploads/2023/06/DSC01381-2-scaled.jpg", width: 1200, height: 630, alt: "Biyum — Agencia de Diseño y Video" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biyum | Agencia de Diseño & Publicidad",
    description: "Fotografía, video, branding y publicidad para tu marca.",
    images: ["https://wp.biyum.agency/wp-content/uploads/2023/06/DSC01381-2-scaled.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={GeistSans.className} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("biyum-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ScrollProgress />
        <div className="grain-overlay" />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Biyum",
              url: "https://biyum.agency",
              image: "https://biyum.agency/logo.svg",
              description:
                "Agencia de diseño, fotografía, video, branding y publicidad en Riobamba, Ecuador.",
              address: { "@type": "PostalAddress", addressLocality: "Riobamba", addressRegion: "Chimborazo", addressCountry: "EC" },
              areaServed: "EC",
              email: "biyumdis@gmail.com",
              sameAs: ["https://www.facebook.com/biyumec", "https://www.instagram.com/biyumecu/"],
            }),
          }}
        />
      </body>
    </html>
  );
}
