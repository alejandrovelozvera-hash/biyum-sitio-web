import { notFound } from "next/navigation";
import AdminProjectForm from "@/components/admin/AdminProjectForm";
import { getProjectByIdentifier, getCategories } from "@/lib/wp-storage";

async function getData(id: string) {
  const [project, categories] = await Promise.all([
    getProjectByIdentifier(id, 0),
    getCategories(0),
  ]);
  return {
    project: project as any,
    categories: (categories || []) as any[],
  };
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { project, categories } = await getData(id);
  if (!project) notFound();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Editar Proyecto
        </h1>
        <p className="text-stone/50 text-sm mt-1">
          {project.title}
        </p>
      </div>
      <AdminProjectForm project={project} categories={categories as any} />
    </div>
  );
}