import { getKnowledge } from "./knowledge";

function chunkKnowledge(kb: string): string[] {
  return kb
    .split(/^##\s+/m)
    .map((c) => c.trim())
    .filter((c) => c.length > 40)
    .flatMap((section) => {
      const parts = section.split(/^###\s+/m).map((p) => p.trim()).filter(Boolean);
      return parts.length > 1 ? parts : [section];
    });
}

function scoreChunk(query: string, chunk: string): number {
  const q = query.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  const c = chunk.toLowerCase();
  let s = 0;
  for (const w of q) if (c.includes(w)) s += w.length > 5 ? 2 : 1;
  return s;
}

export function retrieveRelevant(query: string, topK = 2): string {
  const kb = getKnowledge();
  const chunks = chunkKnowledge(kb);
  const scored = chunks.map((ch) => ({ ch, score: scoreChunk(query, ch) })).sort((a, b) => b.score - a.score);
  const top = scored.filter((s) => s.score >= 2).slice(0, topK).map((s) => s.ch);
  if (top.length === 0) {
    const fallback = scored.filter((s) => s.score > 0).slice(0, 1).map((s) => s.ch);
    return fallback.length ? fallback.join("\n\n") : chunks.slice(0, 1).join("\n\n");
  }
  return top.join("\n\n---\n\n");
}
