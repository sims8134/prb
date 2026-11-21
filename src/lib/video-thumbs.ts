// Thumbnails of the videos page, downloaded once at build time and published as
// files of this domain (/thumbs/<id>-<width>.webp, see src/pages/thumbs/[file].ts).
// The visitor's browser never calls YouTube before a click. A thumbnail that cannot
// be downloaded never breaks the build: the video is then shown with its title and
// the Play button on a neutral background.
import { PLAYLISTS } from "../data/playlists";
import { getPlaylistVideos } from "../data/youtube";

/** YouTube WebP renditions: 320x180, 640x480 (16:9 picture letterboxed, cropped by object-fit) and 1280x720. */
const RENDITIONS = { 320: "mqdefault", 640: "sddefault", 1280: "maxresdefault" } as const;
export type ThumbWidth = keyof typeof RENDITIONS;

/** Cards use 320/640; the featured video of each category also gets 1280. */
export const CARD_WIDTHS: ThumbWidth[] = [320, 640];
export const FEATURED_WIDTHS: ThumbWidth[] = [640, 1280];

const MIN_BYTES = 1000; // YouTube answers tiny placeholders for some missing renditions
const MAX_BYTES = 400 * 1024;
const downloads = new Map<string, Promise<Uint8Array | null>>();

/** Downloads one rendition (memoized for the whole build). Null when it does not exist or fails. */
export function downloadThumb(id: string, width: ThumbWidth): Promise<Uint8Array | null> {
  const key = `${id}-${width}`;
  if (!downloads.has(key)) {
    downloads.set(
      key,
      (async () => {
        try {
          const res = await fetch(`https://i.ytimg.com/vi_webp/${id}/${RENDITIONS[width]}.webp`, {
            signal: AbortSignal.timeout(8000),
          });
          if (!res.ok || !(res.headers.get("content-type") || "").startsWith("image/webp")) return null;
          const bytes = new Uint8Array(await res.arrayBuffer());
          return bytes.byteLength >= MIN_BYTES && bytes.byteLength <= MAX_BYTES ? bytes : null;
        } catch {
          return null;
        }
      })()
    );
  }
  return downloads.get(key)!;
}

export interface ThumbSource {
  src: string;
  srcset: string;
}

/** Published files for one video, or null when none could be downloaded. */
export async function thumbFor(id: string, widths: ThumbWidth[]): Promise<ThumbSource | null> {
  const ok: ThumbWidth[] = [];
  for (const w of widths) if (await downloadThumb(id, w)) ok.push(w);
  if (!ok.length) return null;
  return {
    src: `/thumbs/${id}-${ok[0]}.webp`,
    srcset: ok.map((w) => `/thumbs/${id}-${w}.webp ${w}w`).join(", "),
  };
}

/** Every (video, width) the videos page needs: featured = first video of each playlist. */
export async function allThumbJobs(): Promise<{ id: string; width: ThumbWidth }[]> {
  const jobs = new Map<string, { id: string; width: ThumbWidth }>();
  for (const { playlistId } of PLAYLISTS) {
    if (!playlistId) continue;
    const videos = await getPlaylistVideos(playlistId);
    videos.forEach((v, i) => {
      for (const width of i === 0 ? FEATURED_WIDTHS : CARD_WIDTHS) jobs.set(`${v.videoId}-${width}`, { id: v.videoId, width });
    });
  }
  return [...jobs.values()];
}
