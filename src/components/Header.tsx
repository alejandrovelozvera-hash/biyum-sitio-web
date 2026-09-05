"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "./Icons";
import Link from "next/link";

const scrollToHash = (href: string) => {
  const [path, hash] = href.split("#");
  if (path && path !== "/") return false;
  if (!hash) return false;
  const el = document.getElementById(hash);
  if (!el) return false;
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: "smooth" });
  return true;
};

const navLinks: Array<{ href: string; label: string; children?: Array<{ href: string; label: string }> }> = [
  {
    href: "/#portafolio",
    label: "Portafolio",
    children: [
      { href: "/#portafolio", label: "Diseño y Logos" },
      { href: "/#video", label: "Videos" },
      { href: "/#gastronomica", label: "Gastronómica" },
      { href: "/#servicios", label: "Ver Mas Servicios" },
    ],
  },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#contacto", label: "Contacto" },
  { href: "/chimbuceros", label: "Chimbuceros" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("biyum-theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-xl shadow-indigo-900/10"
          : "bg-gradient-to-b from-surface/70 via-surface/30 to-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="Biyum" className="logo-theme h-7 md:h-9 w-auto" />
        </Link>

 <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  onClick={(e) => {
                    if (window.location.pathname === "/" && link.href.includes("#")) {
                      e.preventDefault();
                      scrollToHash(link.href);
                    }
                  }}
                  className="text-[13px] font-medium tracking-wider uppercase text-gold-dark hover:text-gold transition-colors inline-flex items-center gap-1"
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="opacity-60 group-hover:opacity-100 transition-opacity"><path d="M6 9l6 6 6-6" /></svg>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-surface rounded-2xl ring-1 ring-gold/10 shadow-xl shadow-black/10 p-2 min-w-[200px]">
                    {link.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={(e) => {
                          if (window.location.pathname === "/" && c.href.includes("#")) {
                            e.preventDefault();
                            scrollToHash(c.href);
                          }
                        }}
                        className="block px-4 py-2.5 text-[13px] font-medium text-gold-dark hover:text-gold hover:bg-gold/5 rounded-xl transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (window.location.pathname === "/" && link.href.includes("#")) {
                    e.preventDefault();
                    scrollToHash(link.href);
                  }
                }}
                className="text-[13px] font-medium tracking-wider uppercase text-gold-dark hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <button
            onClick={toggleTheme}
            className="text-gold-dark/60 hover:text-gold transition-colors flex items-center justify-center"
            aria-label="Cambiar tema"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="https://wa.me/message/N3PW46LKUALOK1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium tracking-wider text-gold hover:text-gold-light glass rounded-full px-5 py-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Escríbenos
          </a>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="text-gold-dark/60 hover:text-gold transition-colors flex items-center justify-center"
            aria-label="Cambiar tema"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-gold relative z-50"
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden glass border-t border-gold/10"
          >
            <nav className="flex flex-col p-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.3 }}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      setOpen(false);
                      if (window.location.pathname === "/" && link.href.includes("#")) {
                        scrollToHash(link.href);
                      }
                    }}
                    className="text-sm font-medium tracking-wider uppercase text-gold-dark hover:text-gold py-2.5 block transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 pl-4 border-l border-gold/10 flex flex-col gap-1 mt-1">
                      {link.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => {
                            setOpen(false);
                            if (window.location.pathname === "/" && c.href.includes("#")) {
                              scrollToHash(c.href);
                            }
                          }}
                          className="text-[13px] font-medium text-muted hover:text-gold py-1.5 block transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <a
                  href="https://wa.me/message/N3PW46LKUALOK1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium tracking-wider uppercase text-gold pt-4 mt-2 border-t border-gold/10 block"
                >
                  Escríbenos
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
