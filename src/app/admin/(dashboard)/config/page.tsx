import { getSiteConfig } from "@/lib/wp-storage";
import AdminConfigForm from "@/components/admin/AdminConfigForm";

export default async function AdminConfigPage() {
  const config = await getSiteConfig(0);
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Configuración
        </h1>
        <p className="text-[#525252] text-sm mt-1">
          Administra el hero slider y las categorías de proyectos
        </p>
      </div>
      <AdminConfigForm
        initialSlides={config.hero_slides}
        initialCategories={config.categories}
      />
    </div>
  );
}