// Videos of the PRB YouTube channel, read from the channel's public feed.
// No API key. Runs on the server only, so the visitor's browser never talks to
// YouTube before they click. Thumbnails are served from our own domain by
// src/pages/api/thumb/[id].ts.
//
// Portable: uses only fetch and AbortSignal, which exist on Vercel (Node.js)
// and on Cloudflare (Workers runtime).

export const CHANNEL_ID = "UCoqg7QUUHZJUG-r3oH1B1Sg";
export const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`;
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const TIMEOUT_MS = 4000;
const CACHE_OK_MS = 15 * 60 * 1000; // keep a good answer 15 min per server instance
const CACHE_FAIL_MS = 60 * 1000; // retry a failed feed after 1 min

export interface ChannelVideo {
  id: string;
  title: string;
  published: Date;
}
/** Kept for the components that show one video. */
export type LatestVideo = ChannelVideo;

export type ThumbSize = "max" | "sd" | "card";

let cache: { value: ChannelVideo[]; at: number } | null = null;

function decodeXml(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");
}

/** The site never shows long or en dashes, even inside YouTube titles. */
export function cleanTitle(s: string): string {
  return s.replace(/\s+[—–]\s+/g, ": ").replace(/[—–]/g, "-").trim();
}

/** Regular videos of the feed, newest first. Shorts are skipped (vertical, not made for this page). */
function parseFeed(xml: string): ChannelVideo[] {
  const videos: ChannelVideo[] = [];
  for (const entry of xml.split("<entry>").slice(1)) {
    const id = entry.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
    const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? "";
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];

    if (!id || !title || !published) continue;
    if (link.includes("/shorts/")) continue;

    const date = new Date(published);
    if (Number.isNaN(date.getTime())) continue;

    videos.push({ id, title: cleanTitle(decodeXml(title)), published: date });
  }
  return videos;
}

export async function getChannelVideos(): Promise<ChannelVideo[]> {
  const now = Date.now();
  if (cache && now - cache.at < (cache.value.length ? CACHE_OK_MS : CACHE_FAIL_MS)) {
    return cache.value;
  }

  try {
    const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) throw new Error(`YouTube feed HTTP ${res.status}`);

    const videos = parseFeed(await res.text());
    if (!videos.length) throw new Error("No regular video found in the feed");

    cache = { value: videos, at: now };
    return videos;
  } catch (error) {
    console.error("Channel feed unavailable:", error);
    // Keep showing the last good list if we have one.
    const stale = cache?.value ?? [];
    cache = { value: stale, at: stale.length ? now - CACHE_OK_MS + CACHE_FAIL_MS : now };
    return stale;
  }
}

export async function getLatestVideo(): Promise<LatestVideo | null> {
  return (await getChannelVideos())[0] ?? null;
}

/** Thumbnail served from our own domain (never from YouTube in the visitor's browser). */
export function thumbUrl(id: string, size: ThumbSize): string {
  return `/api/thumb/${id}?s=${size}`;
}

export function watchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
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
