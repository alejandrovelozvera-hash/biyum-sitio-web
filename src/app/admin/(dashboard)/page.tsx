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
        <div className="bg-[#141414] border border-[#1F1F1F] p-6">
          <Folder size={20} className="text-[#525252] mb-3" />
          <p className="text-2xl font-bold text-white">{projects.length}</p>
          <p className="text-[#525252] text-xs mt-1">Proyectos</p>
        </div>
        <div className="bg-[#141414] border border-[#1F1F1F] p-6">
          <Image size={20} className="text-[#525252] mb-3" />
          <p className="text-2xl font-bold text-white">{mediaTotal || "—"}</p>
          <p className="text-[#525252] text-xs mt-1">Imágenes en Media</p>
        </div>
        <div className="bg-[#141414] border border-[#1F1F1F] p-6">
          <Video size={20} className="text-[#525252] mb-3" />
          <p className="text-2xl font-bold text-white">{heroCount}</p>
          <p className="text-[#525252] text-xs mt-1">Slides del hero</p>
        </div>
        <div className="bg-[#141414] border border-[#1F1F1F] p-6">
          <Settings size={20} className="text-[#525252] mb-3" />
          <p className="text-2xl font-bold text-white">{catCount}</p>
          <p className="text-[#525252] text-xs mt-1">Categorías</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <div className="bg-[#141414] border border-[#1F1F1F] p-6">
          <h2 className="text-white font-medium mb-4">Acciones rápidas</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/proyectos/nuevo" className="bg-gold text-[#0A0A0A] px-4 py-2 text-sm font-medium">Nuevo proyecto</Link>
            <Link href="/admin/media" className="border border-white/10 text-white px-4 py-2 text-sm hover:bg-white/5">Gestionar Media</Link>
            <Link href="/admin/chat" className="border border-white/10 text-white px-4 py-2 text-sm hover:bg-white/5">Entrenar Chat IA</Link>
            <Link href="/admin/config" className="border border-white/10 text-white px-4 py-2 text-sm hover:bg-white/5">Editar Hero</Link>
          </div>
        </div>
        <div className="bg-[#141414] border border-[#1F1F1F] p-6">
          <h2 className="text-white font-medium mb-3">Proyectos recientes</h2>
          {recent.length === 0 ? (
            <p className="text-[#525252] text-sm">Aún no hay proyectos.</p>
          ) : (
            <ul className="space-y-2">
              {recent.map((p) => (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <span className="text-white truncate pr-4">{p.title}</span>
                  <span className="text-[#525252] text-xs shrink-0">{p.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-4 bg-[#141414] border border-[#1F1F1F] p-6">
        <h2 className="text-white font-medium mb-2">Cómo funciona</h2>
        <p className="text-[#525252] text-xs">Backend: <a href={process.env.NEXT_PUBLIC_WORDPRESS_URL || "#"} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">{wpHost}</a> · REST /wp-json/biyum/v1</p>
      </div>
    </div>
  );
}