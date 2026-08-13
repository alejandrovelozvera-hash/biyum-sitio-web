import { NextResponse } from "next/server";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/wp-storage";
import { slugify } from "@/lib/utils";

export async function GET() {
  const projects = await getProjects(0);
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title) {
    return NextResponse.json({ error: "El título es obligatorio" }, { status: 400 });
  }

  const project = await createProject({ ...body, slug: slugify(body.title) });
  if (!project) {
    return NextResponse.json({ error: "Error al crear el proyecto" }, { status: 500 });
  }
  return NextResponse.json(project);
}

export async function PUT(request: Request) {
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json({ error: "ID es obligatorio" }, { status: 400 });
  }

  const project = await updateProject(body.id, body);
  if (!project) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
  return NextResponse.json(project);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID es obligatorio" }, { status: 400 });
  }

  const ok = await deleteProject(id);
  if (!ok) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}