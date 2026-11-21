import { cleanTitle } from "../lib/latest-video";

const API_KEY = import.meta.env.YOUTUBE_API_KEY;

// One API call per playlist per build: the videos page (4 languages) and the
// thumbnail files (src/pages/thumbs/[file].ts) share the same answer.
const cache = new Map<string, Promise<PlaylistVideo[]>>();

export interface PlaylistVideo {
  title: string;
  videoId: string;
  publishedAt: string;
}

export function getPlaylistVideos(playlistId: string): Promise<PlaylistVideo[]> {
  if (!cache.has(playlistId)) cache.set(playlistId, fetchPlaylist(playlistId));
  return cache.get(playlistId)!;
}

async function fetchPlaylist(playlistId: string): Promise<PlaylistVideo[]> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error(`YouTube API error: ${res.status}`);
  }

  const data = await res.json();

  return (data.items || []).map((item: any) => ({
    title: cleanTitle(item.snippet.title), // no long dashes on the site, even in YouTube titles
    videoId: item.snippet.resourceId.videoId,
    publishedAt: item.snippet.publishedAt,
  }));
}
