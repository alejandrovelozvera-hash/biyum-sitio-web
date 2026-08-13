import { NextResponse } from "next/server";
import { saveSiteConfig, getSiteConfig } from "@/lib/wp-storage";

export async function PUT(request: Request) {
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