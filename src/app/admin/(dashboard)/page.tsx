import { getProjects, getSiteConfig } from "@/lib/wp-storage";
import { Folder, Image, Video, Settings } from "@/components/Icons";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") redirect("/admin/login");

  const [projects, config] = await Promise.all([
    getProjects(0),
    getSiteConfig(0),
  ]);

  const wpHost = process.env.NEXT_PUBLIC_WORDPRESS_URL
    ? new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL).hostname : "—";

  const heroCount = config.hero_slides?.length || 0;
  const catCount = config.categories?.length || 0;
  let mediaTotal = 0;
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://wp.biyum.agency"}/wp-json/wp/v2/media?per_page=1`, { cache: "no-store" });
    const t = r.headers.get("x-wp-total");
    mediaTotal = t ? parseInt(t) : 0;
  } catch {}

  const recent = [...projects].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-[#525252] text-sm mt-1">Panel de administración</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Folder, label: "Proyectos", value: projects.length, sub: `${projects.filter((p) => p.featured).length} destacados` },
          { icon: Image, label: "Media", value: mediaTotal || "—", sub: "Imágenes" },
          { icon: Video, label: "Hero", value: heroCount, sub: "Slides" },
          { icon: Settings, label: "Categorías", value: catCount, sub: "Activas" },
        ].map((stat) => (
          <div key={stat.label} className="group bg-[#141414] ring-1 ring-white/5 p-6 rounded-2xl hover:ring-white/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <stat.icon size={18} className="text-muted group-hover:text-gold mb-3 transition-colors" />
            <p className="text-[22px] font-bold tracking-[-0.02em] text-white leading-none">{stat.value}</p>
            <p className="text-muted text-xs mt-1.5 tracking-wide">{stat.label}</p>
            <p className="text-[#525252] text-[11px] mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-[#141414] ring-1 ring-white/5 p-6 rounded-2xl">
          <h2 className="text-white font-medium mb-4 text-sm tracking-wide">Acciones rápidas</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/proyectos/nuevo" className="bg-gold text-on-gold px-4 py-2 rounded-full text-sm font-medium hover:bg-gold-light transition-colors">Nuevo proyecto</Link>
            <Link href="/admin/media" className="ring-1 ring-white/10 text-white px-4 py-2 rounded-full text-sm hover:bg-white/5 transition-colors">Gestionar Media</Link>
            <Link href="/admin/chat" className="ring-1 ring-white/10 text-white px-4 py-2 rounded-full text-sm hover:bg-white/5 transition-colors">Entrenar Chat IA</Link>
            <Link href="/admin/config" className="ring-1 ring-white/10 text-white px-4 py-2 rounded-full text-sm hover:bg-white/5 transition-colors">Editar Hero</Link>
          </div>
        </div>
        <div className="bg-[#141414] ring-1 ring-white/5 p-6 rounded-2xl">
          <h2 className="text-white font-medium mb-3 text-sm">Proyectos recientes</h2>
          {recent.length === 0 ? (
            <p className="text-muted text-sm">Aún no hay proyectos.</p>
          ) : (
            <ul className="space-y-2">
              {recent.map((p) => (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <span className="text-white truncate pr-4">{p.title}</span>
                  <span className="bg-white/5 ring-1 ring-white/10 text-muted text-[11px] px-2 py-0.5 rounded-full shrink-0">{p.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-4 bg-[#141414] ring-1 ring-white/5 p-6 rounded-2xl">
        <h2 className="text-white font-medium mb-2 text-sm">Cómo funciona</h2>
        <p className="text-muted text-xs">Backend: <a href={process.env.NEXT_PUBLIC_WORDPRESS_URL || "#"} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">{wpHost}</a> · REST /wp-json/biyum/v1</p>
      </div>
    </div>
  );
}