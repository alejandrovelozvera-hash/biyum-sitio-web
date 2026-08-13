import { NextResponse } from "next/server";
import { saveSiteConfig, getSiteConfig } from "@/lib/wp-storage";
import { requireAdmin } from "@/lib/session";

export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: "No autorizado" }, { status: auth.status });

  const body = await request.json();

  if (!body.slides) {
    return NextResponse.json(
      { error: "Slides son obligatorios" },
      { status: 400 }
    );
  }

  const ok = await saveSiteConfig(body.slides, body.categories || []);
  if (!ok) {
    return NextResponse.json({ error: "Error al guardar la configuración" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

export async function GET() {
  const config = await getSiteConfig(0);
  return NextResponse.json(config);
}