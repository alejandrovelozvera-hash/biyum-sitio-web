import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import AiChatWidget from "@/components/AiChatWidget";
import ErrorBoundary from "@/components/ErrorBoundary";

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
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
    other: [
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Biyum | Agencia de Diseño, Fotografía y Video en Riobamba",
    description:
      "Fotografía, video, branding y publicidad para tu marca. Historias reales que conectan — desde Riobamba para todo Ecuador.",
    url: "https://biyum.agency",
    siteName: "Biyum",
    locale: "es_EC",
    type: "website",
    images: [
      { url: "https://biyum.agency/og-image.png", width: 1200, height: 630, alt: "Biyum — Agencia de Diseño y Video" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biyum | Agencia de Diseño & Publicidad",
    description: "Fotografía, video, branding y publicidad para tu marca.",
    images: ["https://biyum.agency/og-image.png"],
  },
  robots: { index: true, follow: true },
  other: {
    "theme-color": "#1C1463",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${GeistSans.variable} dark`} suppressHydrationWarning style={{colorScheme: 'dark'}}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark"}catch(e){}})();`,
          }}
        />
        <style dangerouslySetInnerHTML={{__html: `
          html,body{background-color:#1C1463!important;color:#D3D3D3!important}
          :root{color-scheme:dark}
          *{color-scheme:dark}
        `}} />
      </head>
      <body className="min-h-screen bg-background text-foreground" style={{backgroundColor:'#1C1463',color:'#D3D3D3',colorScheme:'dark'}}>
        <ScrollProgress />
        <div className="grain-overlay" />
        <ErrorBoundary>{children}</ErrorBoundary>
        <AiChatWidget />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Biyum",
              url: "https://biyum.agency",
              image: "https://biyum.agency/og-image.png",
              description:
                "Agencia de diseño, fotografía, video, branding y publicidad en Riobamba, Ecuador.",
              address: { "@type": "PostalAddress", addressLocality: "Riobamba", addressRegion: "Chimborazo", addressCountry: "EC" },
              areaServed: "EC",
              email: "biyumdis@gmail.com",
              sameAs: ["https://www.facebook.com/profile.php?id=61590844183641", "https://www.instagram.com/alejandro_veloz_vera/"],
            }),
          }}
        />
      </body>
    </html>
  );
}
