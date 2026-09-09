"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dashboard, Folder, Settings, LogOut, Eye, Image } from "../Icons";

const links = [
  { href: "/admin", label: "Dashboard", icon: Dashboard },
  { href: "/admin/proyectos", label: "Proyectos", icon: Folder },
  { href: "/admin/media", label: "Media", icon: Image },
  { href: "/admin/config", label: "Configuración", icon: Settings },
  { href: "/admin/chat", label: "Chat IA", icon: Settings },
];

export default function AdminSidebar() {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#0F0F0F] border-r border-[#1F1F1F] flex flex-col z-50">
      <div className="p-6 border-b border-[#1F1F1F]">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-[22px] font-bold tracking-[-0.03em] text-white">Biyum</span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-gold">Studio</span>
        </Link>
        <p className="text-muted text-[11px] mt-1 tracking-wide">Panel de control</p>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {links.map((link) => {
          const active = path === link.href || (link.href !== "/admin" && path.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13px] font-medium transition-all ring-1 ${
                active
                  ? "bg-gold text-on-gold ring-gold shadow-sm"
                  : "text-muted hover:text-white hover:bg-white/[0.04] ring-transparent hover:ring-white/5"
              }`}
            >
              <link.icon size={16} className={active ? "text-on-gold" : "text-muted group-hover:text-white"} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#1F1F1F] space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm text-muted hover:text-white hover:bg-white/[0.04] ring-1 ring-transparent hover:ring-white/5 transition-all"
        >
          <Eye size={16} /> Ver sitio
        </a>
        <a
          href="/admin/login?logout=true"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm text-muted hover:text-red-400 hover:bg-red-500/5 ring-1 ring-transparent transition-all"
        >
          <LogOut size={16} /> Cerrar sesión
        </a>
      </div>
    </aside>
  );
}
