import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Biyum | Agencia de Diseño & Publicidad",
  description: "Fotografía, video, branding y publicidad para tu marca.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Biyum | Agencia de Diseño & Publicidad",
    description: "Fotografía, video, branding y publicidad para tu marca.",
    locale: "es_EC",
    type: "website",
  },
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
      </body>
    </html>
  );
}
