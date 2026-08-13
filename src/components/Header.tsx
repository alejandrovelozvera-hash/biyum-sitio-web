"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "./Icons";
import Link from "next/link";

const navLinks = [
  { href: "/#portafolio", label: "Portafolio" },
  { href: "/#info", label: "Agencia" },
  { href: "/#contacto", label: "Contacto" },
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

<nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-wider uppercase text-gold-dark/60 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
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
            <nav className="flex flex-col p-6 gap-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium tracking-wider uppercase text-gold-dark/60 hover:text-gold py-2 block transition-colors"
                  >
                    {link.label}
                  </Link>
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
