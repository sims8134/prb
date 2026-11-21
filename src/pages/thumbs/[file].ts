import type { APIRoute, GetStaticPaths } from "astro";
import { allThumbJobs, downloadThumb } from "../../lib/video-thumbs";

// Thumbnails of the videos page, written as static files at build time:
// /thumbs/<videoId>-<width>.webp. Missing renditions are simply not published.
export const prerender = true;

export const getStaticPaths = (async () => {
  const jobs = await allThumbJobs();
  const paths = [];
  const videos = new Set<string>();
  const withFile = new Set<string>();
  for (const { id, width } of jobs) {
    videos.add(id);
    const bytes = await downloadThumb(id, width);
    if (!bytes) continue;
    withFile.add(id);
    paths.push({ params: { file: `${id}-${width}.webp` }, props: { bytes } });
  }
  console.log(`[thumbs] ${paths.length} files for ${videos.size} videos, ${videos.size - withFile.size} without any thumbnail`);
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(props.bytes as Uint8Array, { headers: { "Content-Type": "image/webp" } });
