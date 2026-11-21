// The five playlists of the videos page, in display order. IDs come from the build environment.
export const PLAYLISTS = [
  { key: "urbex", playlistId: import.meta.env.PLAYLIST_URBEX as string | undefined },
  { key: "edit", playlistId: import.meta.env.PLAYLIST_EDIT as string | undefined },
  { key: "unboxing", playlistId: import.meta.env.PLAYLIST_UNBOXING as string | undefined },
  { key: "presentation", playlistId: import.meta.env.PLAYLIST_PRESENTATION as string | undefined },
  { key: "tourism", playlistId: import.meta.env.PLAYLIST_TOURISM as string | undefined },
] as const;
