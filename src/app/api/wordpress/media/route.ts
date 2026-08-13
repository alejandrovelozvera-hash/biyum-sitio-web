import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://biyum.agency";
const TOKEN = process.env.BIYUM_WP_TOKEN || "";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: "No autorizado" }, { status: auth.status });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });
  }

  try {
    const wpForm = new FormData();
    wpForm.append("file", file);

    const res = await fetch(`${WP_URL}/wp-json/biyum/v1/media`, {
      method: "POST",
      headers: { "X-Biyum-Token": TOKEN },
      body: wpForm,
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const item = await res.json();
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  try {
    let url = `${WP_URL}/wp-json/wp/v2/media?page=${page}&per_page=100&_embed`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      return NextResponse.json({ items: [], total: 0 }, { status: 200 });
    }

    const totalHeader = res.headers.get("x-wp-total");
    const total = totalHeader ? parseInt(totalHeader) : 0;

    const data = await res.json();
    const items = data.map((item: any) => {
      const url = item.source_url || "";
      const filePath = item.media_details?.file || item.source_url || "";
      const filename = filePath.split("/").pop() || url.split("/").filter(Boolean).pop() || "";
      return {
        id: item.id,
        title: item.title?.rendered || "",
        url,
        thumb: item.media_details?.sizes?.thumbnail?.source_url || url,
        medium: item.media_details?.sizes?.medium?.source_url || url,
        alt: item.alt_text || "",
        width: item.media_details?.width || 0,
        height: item.media_details?.height || 0,
        filename,
      };
    });

    return NextResponse.json({ items, total });
  } catch {
    return NextResponse.json({ items: [], total: 0 });
  }
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: "No autorizado" }, { status: auth.status });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Falta id" }, { status: 400 });
  }

  try {
    const res = await fetch(`${WP_URL}/wp-json/biyum/v1/media/${id}`, {
      method: "DELETE",
      headers: { "X-Biyum-Token": TOKEN },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return NextResponse.json({ error: data?.message || "No se pudo eliminar" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}