import { getProjects } from "@/lib/wp-storage";
import Link from "next/link";
import { Plus } from "@/components/Icons";
import AdminProjectList from "@/components/admin/AdminProjectList";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjects(0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Proyectos</h1>
          <p className="text-[#525252] text-sm mt-1">Gestiona tu portafolio</p>
        </div>
        <Link href="/admin/proyectos/nuevo" className="flex items-center gap-2 bg-gold text-[#0A0A0A] px-5 py-2.5 text-sm font-medium hover:bg-gold-light transition-colors">
          <Plus size={16} /> Nuevo
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-[#141414] border border-[#1F1F1F]">
          <p className="text-[#525252]">No hay proyectos aún</p>
          <Link href="/admin/proyectos/nuevo" className="text-gold text-sm hover:underline mt-2 inline-block">Crear el primer proyecto</Link>
        </div>
      ) : (
        <AdminProjectList projects={projects} />
      )}
    </div>
  );
}
