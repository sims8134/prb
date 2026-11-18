// Latest video of the PRB YouTube channel, read from the channel's public feed.
// No API key. Runs on the server only, so the visitor's browser never talks to
// YouTube before they click the video.
//
// Portable: uses only fetch, AbortSignal and btoa, which exist on Vercel
// (Node.js) and on Cloudflare (Workers runtime).

export const CHANNEL_ID = "UCoqg7QUUHZJUG-r3oH1B1Sg";
export const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`;
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const TIMEOUT_MS = 4000; // feed
const THUMB_TIMEOUT_MS = 2000; // thumbnail: if slow, the page shows the bordeaux frame instead
const CACHE_OK_MS = 15 * 60 * 1000; // keep a good answer 15 min per server instance
const CACHE_FAIL_MS = 60 * 1000; // retry a failed feed after 1 min
const MAX_THUMB_BYTES = 150 * 1024;

export interface LatestVideo {
  id: string;
  title: string;
  published: Date;
  /** Thumbnail embedded as a data URI, or null if it could not be fetched. */
  thumbnail: string | null;
}

let cache: { value: LatestVideo | null; at: number } | null = null;

function decodeXml(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/** Newest regular video of the feed. Shorts are skipped (vertical, not made for this page). */
function parseFeed(xml: string): Omit<LatestVideo, "thumbnail"> | null {
  for (const entry of xml.split("<entry>").slice(1)) {
    const id = entry.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
    const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? "";
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];

    if (!id || !title || !published) continue;
    if (link.includes("/shorts/")) continue;

    const date = new Date(published);
    if (Number.isNaN(date.getTime())) continue;

    return { id, title: decodeXml(title).trim(), published: date };
  }
  return null;
}

async function fetchThumbnail(id: string): Promise<string | null> {
  try {
    const res = await fetch(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`, {
      signal: AbortSignal.timeout(THUMB_TIMEOUT_MS),
    });
    if (!res.ok || !(res.headers.get("content-type") || "").startsWith("image/")) return null;

    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes.length === 0 || bytes.length > MAX_THUMB_BYTES) return null;

    return `data:image/jpeg;base64,${toBase64(bytes)}`;
  } catch {
    return null;
  }
}

export async function getLatestVideo(): Promise<LatestVideo | null> {
  const now = Date.now();
  if (cache && now - cache.at < (cache.value ? CACHE_OK_MS : CACHE_FAIL_MS)) {
    return cache.value;
  }

  try {
    const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) throw new Error(`YouTube feed HTTP ${res.status}`);

    const video = parseFeed(await res.text());
    if (!video) throw new Error("No regular video found in the feed");

    const value: LatestVideo = { ...video, thumbnail: await fetchThumbnail(video.id) };
    cache = { value, at: now };
    return value;
  } catch (error) {
    console.error("Latest video unavailable:", error);
    // Keep showing the last good video if we have one.
    const stale = cache?.value ?? null;
    cache = { value: stale, at: stale ? now - CACHE_OK_MS + CACHE_FAIL_MS : now };
    return stale;
  }
}

const ROMAN_MONTHS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/** Bulgarian-style date: day, month in Roman numerals, year. Example: 14 XI 2026. */
export function romanDate(d: Date): string {
  return `${d.getUTCDate()} ${ROMAN_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Same date spelled out for screen readers. Example: 14 November 2026. */
export function spokenDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
