import { Mail, MapPin } from "./Icons";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-background">
      <div className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="bg-surface rounded-3xl p-10 md:p-16 ring-1 ring-gold/10 overflow-hidden relative">
          <span aria-hidden className="pointer-events-none select-none absolute -bottom-6 -right-2 text-[18vw] md:text-[10vw] font-bold tracking-[-0.06em] leading-none text-transparent opacity-[0.04]" style={{ WebkitTextStroke: "1px var(--watermark-stroke)", color: "transparent" }}>BIYUM</span>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative">
            <div className="md:col-span-5">
              <img src="/logo.svg" alt="Biyum" className="logo-theme h-8 w-auto mb-4" />
              <p className="mt-4 text-secondary text-sm leading-relaxed max-w-md">
                Agencia de diseño, fotografía, video, branding y pauta digital para marcas que buscan destacar.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="w-8 h-px bg-gold/20" />
                <span className="text-muted text-[10px] tracking-[0.2em] uppercase">Riobamba — Ecuador · Desde 2020</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted text-xs tracking-widest uppercase mb-5">Navegación</p>
              <div className="flex flex-col gap-2.5">
                {["Inicio", "Servicios", "Portafolio", "Videos", "Contacto"].map((item) => (
                  <a key={item} href={item === "Inicio" ? "/" : `/#${item.toLowerCase() === "videos" ? "video" : item.toLowerCase()}`} className="text-secondary hover:text-gold text-sm transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted text-xs tracking-widest uppercase mb-5">Servicios</p>
              <div className="flex flex-col gap-2.5">
                {["Fotografía", "Video", "Branding", "Social Media"].map((item) => (
                  <span key={item} className="text-secondary text-sm">{item}</span>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="text-muted text-xs tracking-widest uppercase mb-5">Contacto</p>
              <div className="flex flex-col gap-3 text-sm">
                <a href="mailto:biyumdis@gmail.com" className="flex items-center gap-2 text-secondary hover:text-gold transition-colors"><Mail size={14} /> biyumdis@gmail.com</a>
                <div className="flex items-start gap-2 text-secondary"><MapPin size={14} className="mt-0.5 shrink-0" /><span>Riobamba</span></div>
                <a href="https://wa.me/message/N3PW46LKUALOK1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary hover:text-gold transition-colors text-xs">WhatsApp · Respuesta en &lt; 2h</a>
              </div>
              <p className="text-muted text-[10px] tracking-[0.2em] uppercase mt-8 mb-3">Síguenos</p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/biyumec" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-on-gold flex items-center justify-center ring-1 ring-gold/15 transition-all hover:scale-105">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="https://www.instagram.com/biyumecu/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-on-gold flex items-center justify-center ring-1 ring-gold/15 transition-all hover:scale-105">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>
              </div>
              <a href="https://wa.me/message/N3PW46LKUALOK1" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 w-full text-sm text-on-gold bg-gold hover:bg-gold-light rounded-full px-6 py-3 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                Chatea por WhatsApp
              </a>
              <p className="text-muted text-[10px] mt-2.5 text-center">Respuesta en menos de 2 horas</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-muted text-xs border-t border-gold/10 pt-8">
          <span>Biyum &copy; {new Date().getFullYear()} — Hecho con ♥ en Riobamba</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 bg-gold rounded-full animate-pulse" /> Disponible para nuevos proyectos</span>
        </div>
      </div>
    </footer>
  );
}
