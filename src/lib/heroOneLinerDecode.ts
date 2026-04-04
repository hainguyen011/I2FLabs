const GLYPHS = '█▓░╱╲01ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function buildPool(target: string): string[] {
  const fromText = [...new Set(Array.from(target))].filter((c) => c.trim() !== '');
  const extra = Array.from(GLYPHS);
  return [...new Set([...fromText, ...extra])];
}

/** Cùng progress → cùng glyph (ổn định khi scrub GSAP). */
function scrambleChar(pool: string[], seed: number): string {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  const f = x - Math.floor(x);
  return pool[Math.floor(f * pool.length)] ?? '█';
}

/** rawProgress 0–1, scrub-friendly (eased inside) */
export function decodeFrame(
  finalText: string,
  pool: string[],
  rawProgress: number,
): { text: string; done: boolean } {
  const p = Math.max(0, Math.min(1, rawProgress));
  const ease = 1 - Math.pow(1 - p, 2.4);
  const chars = Array.from(finalText);
  const threshold = ease * (chars.length + 0.35);
  const text = chars
    .map((c, i) => {
      if (c === ' ' || c === '\n') return c;
      if (i < threshold) return c;
      return scrambleChar(pool, i * 19.17 + rawProgress * 47.11);
    })
    .join('');
  return { text, done: p >= 0.998 };
}
