import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const s = (d: string, size = 20) =>
  ({ size: sz = size, className, ...rest }: IconProps) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
      <path d={d} />
    </svg>
  );

export const Menu = s("M3 6h18M3 12h18M3 18h18");
export const X = s("M18 6L6 18M6 6l12 12");
export const ChevronLeft = s("M15 18l-6-6 6-6");
export const ChevronRight = s("M9 18l6-6-6-6");
export const ArrowLeft = s("M19 12H5m7-7l-7 7 7 7");
export const Plus = s("M12 5v14m-7-7h14");
export const Trash = s("M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2");
export const Pencil = s("M17 3a2.85 2.85 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z");
export const Eye = s("M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z");
export const Search = s("M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z");
export const Save = s("M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8");
export const LogIn = s("M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3");
export const LogOut = s("M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9");
export const Folder = s("M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z");
export const Image = s("M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m16-4l-5-5m-3 7l-5-5m5 5l-5 5");
export const Settings = s("M12 15a3 3 0 100-6 3 3 0 000 6zm0 0l1.5-1.5M12 9V7.5M12 16.5V18m7.5-6H18M6 12H4.5M16.95 7.05l-1.06 1.06M8.11 15.89l-1.06 1.06M16.95 16.95l-1.06-1.06M8.11 8.11L7.05 7.05");
export const Dashboard = s("M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z");
export const Mail = s("M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6");
export const MapPin = s("M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 7a3 3 0 100 6 3 3 0 000-6z");

export const Spinner = ({ size = 20, className, ...rest }: IconProps) => (
  <svg className={`animate-spin ${className || ""}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...rest}>
    <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeLinecap="round" />
  </svg>
);

export const Camera = ({ size = 20, className, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

export const Video = ({ size = 20, className, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

export const Palette = ({ size = 20, className, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a7 7 0 000 14 7 7 0 010-14z" />
    <path d="M9 12a1 1 0 100-2 1 1 0 000 2zM15 12a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

export const Megaphone = ({ size = 20, className, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

export const Code = ({ size = 20, className, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
    <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 3l-4 18" />
  </svg>
);

export const Sun = ({ size = 20, className, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

export const Moon = ({ size = 20, className, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);
