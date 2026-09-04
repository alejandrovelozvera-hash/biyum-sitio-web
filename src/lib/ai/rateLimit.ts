type Entry = { count: number; resetAt: number };
const ipMap = new Map<string, Entry>();
const sessionMap = new Map<string, Entry>();

function hit(map: Map<string, Entry>, key: string, windowMs: number, max: number): boolean {
  const now = Date.now();
  const e = map.get(key);
  if (!e || now > e.resetAt) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  e.count++;
  if (e.count > max) return true;
  return false;
}

export function isRateLimited(ip: string, sessionId: string): { limited: boolean; reason?: string } {
  if (hit(ipMap, ip, 60_000, 10)) return { limited: true, reason: "Demasiadas solicitudes. Intenta en un minuto." };
  if (hit(ipMap, `${ip}:hour`, 3_600_000, 60)) return { limited: true, reason: "Límite por hora alcanzado." };
  if (hit(sessionMap, sessionId, 3_600_000, 30)) return { limited: true, reason: "Demasiados mensajes en esta sesión." };
  return { limited: false };
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
