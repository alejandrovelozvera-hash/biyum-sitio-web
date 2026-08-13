import { NextResponse } from "next/server";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://biyum.agency";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  try {
    let url = `${WP_URL}/wp-json/wp/v2/media?page=${page}&per_page=50&_embed`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const res = await fetch(url, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const totalHeader = res.headers.get("x-wp-total");
    const total = totalHeader ? parseInt(totalHeader) : 0;

    const data = await res.json();
    const items = data.map((item: any) => ({
      id: item.id,
      title: item.title?.rendered || "",
      url: item.source_url || "",
      thumb:
        item.media_details?.sizes?.thumbnail?.source_url || item.source_url,
      medium:
        item.media_details?.sizes?.medium?.source_url || item.source_url,
      alt: item.alt_text || "",
      width: item.media_details?.width || 0,
      height: item.media_details?.height || 0,
    }));

    return NextResponse.json({ items, total });
  } catch {
    return NextResponse.json({ items: [], total: 0 });
  }
}
