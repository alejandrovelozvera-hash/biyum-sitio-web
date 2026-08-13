import { readdir, stat, readFile } from "node:fs/promises";
import { readFileSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { Blob } from "node:buffer";

function loadEnv() {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return {};
  const lines = readFileSync(envPath, "utf8");
  const out = {};
  for (const line of lines.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = loadEnv();
const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || env.NEXT_PUBLIC_WORDPRESS_URL || "https://wp.biyum.agency";
const BASE = `${WP_URL}/wp-json/biyum/v1`;
const TOKEN = process.env.BIYUM_WP_TOKEN || env.BIYUM_WP_TOKEN;
const PORTAFOLIO = process.env.PORTAFOLIO_DIR || "C:\\Users\\ASRock\\Downloads\\PORTAFOLIO";
const BEHIND = Boolean(process.env.BEHIND);

const CATEGORIES = [
  { name: "Logos", slug: "logos" },
  { name: "Art Covers", slug: "art-covers" },
  { name: "Manipulación Fotográfica", slug: "manipulacion-fotografica" },
];

const FOLDER_CATEGORY = {
  "actio legis": "logos",
  "art covers": "art-covers",
  "bomba frutal": "logos",
  "comercial veloz": "logos",
  "concept art": "manipulacion-fotografica",
  "fase matiz": "logos",
  "g&b": "logos",
  "ivez": "logos",
  "learn to pic": "logos",
  "maki": "logos",
  "midas": "logos",
  "samsara": "logos",
  "solaz estudio": "logos",
  "sonoluz": "logos",
  "sr yuy": "logos",
  "toma2": "logos",
  "universidad para el futuro": "logos",
  "votegus": "logos",
};

const TITLES = {
  "actio legis": "Actio Legis",
  "art covers": "Art Covers",
  "bomba frutal": "Bomba Frutal",
  "comercial veloz": "Comercial Veloz",
  "concept art": "Concept Art",
  "fase matiz": "Fase Matiz",
  "g&b": "G&B",
  "ivez": "Ivez",
  "learn to pic": "Learn to Pic",
  "maki": "Maki",
  "midas": "Midas",
  "samsara": "Samsara",
  "solaz estudio": "Solaz Estudio",
  "sonoluz": "Sonoluz",
  "sr yuy": "Sr. Yuy",
  "toma2": "Toma 2",
  "universidad para el futuro": "Universidad para el Futuro",
  "votegus": "Votegus",
};

const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif", ".bmp"]);

if (!TOKEN) {
  console.error("Falta BIYUM_WP_TOKEN. Asigna el token real en .env.local antes de ejecutar.");
  process.exit(1);
}

async function wpJson(path, init) {
  const res = await fetch(`${BASE}${path}`, init);
  let body = null;
  try { body = await res.json(); } catch {}
  if (!res.ok) {
    throw new Error(`${init?.method || "GET"} ${path} -> ${res.status} ${JSON.stringify(body)}`);
  }
  return body;
}

async function uploadImage(filePath) {
  const name = basename(filePath);
  const buf = await readFile(filePath);
  const blob = new Blob([buf]);
  const fd = new FormData();
  fd.append("file", blob, name);
  const res = await fetch(`${BASE}/media`, {
    method: "POST",
    headers: { "X-Biyum-Token": TOKEN },
    body: fd,
  });
  let body = null;
  try { body = await res.json(); } catch {}
  if (!res.ok) {
    throw new Error(`POST /media (${name}) -> ${res.status} ${JSON.stringify(body)}`);
  }
  return body;
}

async function processFolder(dir, name, existingTitles) {
  const key = name.toLowerCase();
  const category = FOLDER_CATEGORY[key];
  if (!category) {
    console.log(`  [skip] sin categoría mapeada: ${name}`);
    return null;
  }
  const title = TITLES[key] || name;

  if (existingTitles.has(title)) {
    console.log(`  [skip] ya importado: ${name}`);
    return null;
  }

  const entries = await readdir(dir);
  const images = [];
  for (const entry of entries.sort((a, b) => a.localeCompare(b, "es"))) {
    const fp = join(dir, entry);
    const s = await stat(fp);
    if (!s.isFile()) continue;
    if (!IMG_EXT.has(extname(entry).toLowerCase())) continue;
    if (entry.toLowerCase().startsWith("~$")) continue;
    images.push(fp);
  }
  if (!images.length) {
    console.log(`  [skip] sin imágenes: ${name}`);
    return null;
  }
  console.log(`  [${name}] subiendo ${images.length} imágenes...`);

  const media = [];
  for (const fp of images) {
    const m = await uploadImage(fp);
    media.push(m);
    console.log(`    + ${basename(fp)} -> id ${m.id}`);
  }

  const cover = media[0];
  const project = {
    title,
    category,
    description: "",
    cover_image_url: cover.url,
    cover_image_id: cover.id,
    images: media.map((m) => ({
      id: m.id,
      url: m.url,
      thumb: m.thumb || m.url,
      medium: m.medium || m.url,
      alt: m.title || title,
      width: m.width || 0,
      height: m.height || 0,
    })),
    video_url: null,
    client: null,
    year: null,
    services: [],
    featured: false,
  };

  console.log(`  [${name}] creando proyecto...`);
  const created = await wpJson("/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Biyum-Token": TOKEN },
    body: JSON.stringify(project),
  });
  console.log(`  [${name}] OK -> id ${created.id} (slug: ${created.slug})`);
  return created;
}

async function ensureCategories() {
  const current = await wpJson("/config");
  const existing = current.categories || [];
  const merged = [...existing];
  let changed = false;
  for (let i = 0; i < CATEGORIES.length; i++) {
    const cat = CATEGORIES[i];
    if (!merged.some((c) => c.slug === cat.slug)) {
      merged.push({ id: `cat-${Date.now()}-${i}`, ...cat, order_index: merged.length });
      changed = true;
    }
  }
  if (changed) {
    await wpJson("/config", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Biyum-Token": TOKEN },
      body: JSON.stringify({ slides: current.hero_slides || [], categories: merged }),
    });
    console.log("Categorías actualizadas en config.");
  } else {
    console.log("Las categorías ya existen.");
  }
}

console.log(`WP: ${WP_URL}`);
if (BEHIND) {
  console.log("Modo PRUEBA (BEHIND): no sube nada, solo lista.");
}

const rootEntries = await readdir(PORTAFOLIO).catch((e) => {
  console.error(`No se pudo leer PORTAFOLIO (${PORTAFOLIO}): ${e.message}`);
  process.exit(1);
});

const done = [];
let existing = [];
try { existing = await wpJson("/projects?cb=" + Date.now()); } catch (e) { console.error("No se pudo leer proyectos existentes: " + e.message); }
const existingSlugs = new Set(existing.map((p) => p.slug));
const existingTitles = new Set(existing.map((p) => p.title));
console.log(`Proyectos existentes: ${existing.length}`);

for (const entry of rootEntries.sort((a, b) => a.localeCompare(b, "es"))) {
  const fp = join(PORTAFOLIO, entry);
  const s = await stat(fp);
  if (!s.isDirectory()) continue;
  if (BEHIND) {
    console.log(`- ${entry}`);
    continue;
  }
  try {
    const p = await processFolder(fp, entry, existingTitles);
    if (p) done.push(p);
  } catch (e) {
    console.error(`  [${entry}] ERROR: ${e.message}`);
  }
}

if (!BEHIND) {
  console.log(`\nImportación terminada: ${done.length} proyectos creados.`);
  try { await ensureCategories(); } catch (e) { console.error("Categorías: " + e.message); }
  console.log("Listo. Verifica en https://biyum.agency/admin y en /proyecto/<slug>.");
}