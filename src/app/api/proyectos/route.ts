import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/wp-storage";
import { slugify } from "@/lib/utils";
import { requireAdmin } from "@/lib/session";

function revalidatePublic() {
  revalidatePath("/", "page");
  revalidatePath("/proyecto/[slug]", "page");
  revalidatePath("/admin/proyectos", "page");
}

export async function GET() {
  const projects = await getProjects(0);
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: "No autorizado" }, { status: auth.status });

  const body = await request.json();

  if (!body.title) {
    return NextResponse.json({ error: "El título es obligatorio" }, { status: 400 });
  }

  const project = await createProject({ ...body, slug: slugify(body.title) });
  if (!project) {
    return NextResponse.json({ error: "Error al crear el proyecto" }, { status: 500 });
  }
  revalidatePublic();
  return NextResponse.json(project);
}

export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: "No autorizado" }, { status: auth.status });

  const body = await request.json();

  if (!body.id) {
    return NextResponse.json({ error: "ID es obligatorio" }, { status: 400 });
  }

  const project = await updateProject(body.id, body);
  if (!project) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
  revalidatePublic();
  return NextResponse.json(project);
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: "No autorizado" }, { status: auth.status });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID es obligatorio" }, { status: 400 });
  }

  const ok = await deleteProject(id);
  if (!ok) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
  revalidatePublic();
  return NextResponse.json({ success: true });
}