import fs from "fs";
import path from "path";

export function getKnowledge(): string {
  try {
    const p = path.join(process.cwd(), "kb", "biyum.md");
    return fs.readFileSync(p, "utf-8");
  } catch {
    return "";
  }
}

export function shouldEscalate(text: string): boolean {
  const t = text.toLowerCase();
  return [
    "contratar",
    "quiero",
    "precio",
    "presupuesto",
    "cotizar",
    "planes",
    "cuanto cuesta",
    "cuánto cuesta",
    "contratarte",
    "servicio",
  ].some((k) => t.includes(k));
}
