import { getProjects, getSiteConfig } from "@/lib/wp-storage";
import { Folder, Image } from "@/components/Icons";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-[#525252] text-sm mt-1">Panel de administración</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-[#1F1F1F] p-8">
          <Folder size={22} className="text-[#525252] mb-4" />
          <p className="text-3xl font-bold text-white">{projects.length}</p>
          <p className="text-[#525252] text-sm mt-1">Proyectos</p>
        </div>
        <div className="bg-[#141414] border border-[#1F1F1F] p-8">
          <Image size={22} className="text-[#525252] mb-4" />
          <p className="text-3xl font-bold text-white">WordPress</p>
          <p className="text-[#525252] text-sm mt-1">{wpHost}</p>
        </div>
        <div className="bg-[#141414] border border-[#1F1F1F] p-8">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#525252] mb-4">
            <circle cx="12" cy="12" r="3" /><path d="M12 2v3" /><path d="M12 19v3" /><path d="M2 12h3" /><path d="M19 12h3" /><path d="M5 5l2 2" /><path d="M17 17l2 2" /><path d="M5 19l2-2" /><path d="M17 7l2-2" />
          </svg>
          <p className="text-3xl font-bold text-white">WordPress</p>
          <p className="text-[#525252] text-sm mt-1">Almacenamiento real</p>
        </div>
      </div>
      <div className="mt-8 bg-[#141414] border border-[#1F1F1F] p-8">
        <h2 className="text-white font-medium mb-4">Cómo funciona</h2>
        <ol className="text-[#737373] text-sm space-y-2">
          <li>1. Sube imágenes a WordPress</li>
          <li>2. Ve a <a href="/admin/proyectos" className="text-gold hover:underline">Proyectos</a> y crea uno nuevo</li>
          <li>3. Selecciona las imágenes desde WordPress</li>
          <li>4. El proyecto se publica automáticamente</li>
        </ol>
        <p className="text-[#737373] text-sm mt-6 pt-4 border-t border-[#1F1F1F]">
          Backend: <a href={process.env.NEXT_PUBLIC_WORDPRESS_URL || "#"} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">{wpHost}</a> · REST /wp-json/biyum/v1
        </p>
      </div>
    </div>
  );
}