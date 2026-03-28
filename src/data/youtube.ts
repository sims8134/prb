const API_KEY = import.meta.env.YOUTUBE_API_KEY;

export async function getPlaylistVideos(playlistId: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error(`YouTube API error: ${res.status}`);
  }

  const data = await res.json();

  return (data.items || []).map((item: any) => ({
    title: item.snippet.title,
    videoId: item.snippet.resourceId.videoId,
    thumbnail:
      item.snippet.thumbnails?.high?.url ||
      item.snippet.thumbnails?.medium?.url ||
      item.snippet.thumbnails?.default?.url,
    publishedAt: item.snippet.publishedAt,
  }));
}
