// Display helper: removes an emoji used as a leading icon ("▶ Latest Video", "📺 All Videos",
// "📩 Check your email…", "⚠ …") so the page can show a line icon instead, or nothing.
// The texts themselves stay unchanged in src/data/site.ts.
export function noIcon(text: string): string {
  return text.replace(/^[\s\p{Extended_Pictographic}▶▸☕⚠✉✓✔️]+/u, "").trim();
}
