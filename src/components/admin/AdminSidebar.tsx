"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dashboard, Folder, Settings, LogOut, Eye } from "../Icons";

const links = [
  { href: "/admin", label: "Dashboard", icon: Dashboard },
  { href: "/admin/proyectos", label: "Proyectos", icon: Folder },
  { href: "/admin/config", label: "Configuración", icon: Settings },
];

export default function AdminSidebar() {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0A0A0A] border-r border-[#1F1F1F] flex flex-col z-50">
      <div className="p-6 border-b border-[#1F1F1F]">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          Biyum <span className="text-[#525252] text-xs ml-1">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {links.map((link) => {
          const active = path === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded text-sm transition-all ${
                active ? "bg-white/5 text-white" : "text-[#525252] hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1F1F1F] space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded text-sm text-[#525252] hover:text-white hover:bg-white/[0.02] transition-all"
        >
          <Eye size={16} /> Ver sitio
        </a>
        <a
          href="/admin/login?logout=true"
          className="flex items-center gap-3 px-4 py-2.5 rounded text-sm text-[#525252] hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut size={16} /> Cerrar sesión
        </a>
      </div>
    </aside>
  );
}
