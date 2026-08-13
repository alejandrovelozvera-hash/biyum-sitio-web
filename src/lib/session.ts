import { cookies } from "next/headers";

export async function isAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    return !!session && session.value === "authenticated";
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<
  { ok: true } | { ok: false; status: number }
> {
  const authed = await isAdminSession();
  return authed ? { ok: true } : { ok: false, status: 401 };
}