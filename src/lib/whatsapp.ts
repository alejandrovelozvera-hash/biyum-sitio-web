export const HEADER_OFFSET = 80;

const BASE_NUMBER = "N3PW46LKUALOK1";
const BASE_URL = `https://wa.me/message/${BASE_NUMBER}`;

export type ServiceKey =
  | "gastronomica"
  | "video"
  | "branding"
  | "social"
  | "web"
  | "drone"
  | "color-grading"
  | "portfolio"
  | "general";

const serviceMessages: Record<ServiceKey, string> = {
  gastronomica: "Hola Biyum, me interesa la fotografía gastronómica $15 por plato",
  video: "Hola Biyum, me interesa la producción de video",
  branding: "Hola Biyum, me interesa el servicio de branding",
  social: "Hola Biyum, me interesa el servicio de social media",
  web: "Hola Biyum, me interesa el diseño web",
  drone: "Hola Biyum, me interesa el servicio de drone",
  "color-grading": "Hola Biyum, me interesa el color grading",
  portfolio: "Hola Biyum, vi su portafolio y me interesa trabajar con ustedes",
  general: "Hola Biyum, tengo un proyecto en mente",
};

export function getWhatsAppUrl(service?: ServiceKey, customMessage?: string): string {
  const text = customMessage || (service ? serviceMessages[service] : serviceMessages.general);
  return `${BASE_URL}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppUrlWithParams(params: { name?: string; service?: ServiceKey; message?: string }): string {
  const { name, service, message } = params;
  let text = "Hola Biyum";
  if (name) text += `, soy ${name}`;
  if (service) text += `. Me interesa ${serviceMessages[service].replace("Hola Biyum, me interesa ", "").replace("Hola Biyum, ", "")}`;
  if (message) text += `. ${message}`;
  return `${BASE_URL}?text=${encodeURIComponent(text)}`;
}