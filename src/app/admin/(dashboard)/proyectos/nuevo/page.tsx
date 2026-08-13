import AdminProjectForm from "@/components/admin/AdminProjectForm";
import { getCategories } from "@/lib/wp-storage";

export default async function NewProjectPage() {
  const categories = await getCategories(0);
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Nuevo Proyecto
        </h1>
        <p className="text-stone/50 text-sm mt-1">
          Crea un nuevo proyecto para tu portafolio
        </p>
      </div>
      <AdminProjectForm categories={categories as any} />
    </div>
  );
}