import type { APIRoute } from "astro";
import { getChannelVideos, type ThumbSize } from "../../../lib/latest-video";

// Video thumbnails served from our own domain, so the visitor's browser never
// calls YouTube before a click. Only videos of the PRB channel feed are served:
// this is not an open proxy.
export const prerender = false;

const MAX_BYTES = 350 * 1024;
const TIMEOUT_MS = 3000;

// Best first. WebP when YouTube has it, JPEG as a last resort.
const CANDIDATES: Record<ThumbSize, string[]> = {
  max: ["vi_webp/{id}/maxresdefault.webp", "vi_webp/{id}/sddefault.webp", "vi/{id}/hqdefault.jpg"],
  sd: ["vi_webp/{id}/sddefault.webp", "vi/{id}/hqdefault.jpg"],
  card: ["vi_webp/{id}/mqdefault.webp", "vi/{id}/mqdefault.jpg"],
};

const notFound = () =>
  new Response("Not found", { status: 404, headers: { "Cache-Control": "public, max-age=60, s-maxage=300" } });

export const GET: APIRoute = async ({ params, url }) => {
  const id = params.id || "";
  const size = (url.searchParams.get("s") || "card") as ThumbSize;
  if (!/^[\w-]{11}$/.test(id) || !(size in CANDIDATES)) return notFound();

  const known = (await getChannelVideos()).some((v) => v.id === id);
  if (!known) return notFound();

  for (const path of CANDIDATES[size]) {
    try {
      const res = await fetch(`https://i.ytimg.com/${path.replace("{id}", id)}`, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      const type = res.headers.get("content-type") || "";
      if (!res.ok || !type.startsWith("image/")) continue;

      const body = await res.arrayBuffer();
      if (body.byteLength === 0 || body.byteLength > MAX_BYTES) continue;

      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": type,
          // Browsers keep it a day, the CDN a week, refreshed in the background.
          "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800",
        },
      });
    } catch {
      // try the next candidate
    }
  }
  return notFound();
};
