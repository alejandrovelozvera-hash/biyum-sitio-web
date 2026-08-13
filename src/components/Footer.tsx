import { Mail, MapPin } from "./Icons";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-background">
      <div className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="bg-surface rounded-3xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-4 gap-16 ring-1 ring-gold/10">
          <div className="md:col-span-2">
            <img src="/logo.svg" alt="Biyum" className="logo-theme h-8 w-auto mb-4" />
            <p className="mt-4 text-secondary text-sm leading-relaxed max-w-md">
              Agencia de diseño, fotografía, video, branding y pauta digital para marcas que buscan destacar.
            </p>
          </div>
          <div>
            <p className="text-muted text-xs tracking-widest uppercase mb-5">Navegación</p>
            <div className="flex flex-col gap-2">
              {["Inicio", "Servicios", "Portafolio", "Contacto"].map((item) => (
                <a key={item} href={item === "Inicio" ? "/" : `/#${item.toLowerCase()}`} className="text-secondary hover:text-gold text-sm transition-colors">{item}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-muted text-xs tracking-widest uppercase mb-5">Contacto</p>
            <div className="flex flex-col gap-4 text-sm">
              <a href="mailto:biyumdis@gmail.com" className="flex items-center gap-2 text-secondary hover:text-gold transition-colors"><Mail size={14} /> biyumdis@gmail.com</a>
              <div className="flex items-start gap-2 text-secondary"><MapPin size={14} className="mt-0.5 shrink-0" /><span>Riobamba</span></div>
              <div className="flex gap-4 mt-2">
                <a href="https://www.facebook.com/biyumec" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-gold transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="https://www.instagram.com/biyumecu/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-gold transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-gold/10 text-center text-muted text-xs">Biyum &copy; {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
