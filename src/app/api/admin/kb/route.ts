import fs from "fs";
import path from "path";

export const runtime = "nodejs";

function checkAuth(req: Request): boolean {
  const cookie = req.headers.get("cookie") || "";
  return cookie.includes("biyum_admin");
}

export async function GET(req: Request) {
  if (!checkAuth(req)) return Response.json({ error: "No autorizado" }, { status: 401 });
  try {
    const p = path.join(process.cwd(), "kb", "biyum.md");
    const c = fs.readFileSync(p, "utf-8");
    return Response.json({ content: c });
  } catch {
    return Response.json({ content: "" });
  }
}

export async function POST(req: Request) {
  if (!checkAuth(req)) return Response.json({ error: "No autorizado" }, { status: 401 });
  const { content } = await req.json();
  if (typeof content !== "string" || content.length > 50000) return Response.json({ error: "Contenido inválido" }, { status: 400 });
  const p = path.join(process.cwd(), "kb", "biyum.md");
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf-8");
  return Response.json({ ok: true });
}
