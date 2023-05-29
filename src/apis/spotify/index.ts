/**
 * @see https://github.com/spotify/web-api-examples
 * @see https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
 */
import axios from 'axios';

export * from './auth-pkce';

export const axiosInstance = axios.create({
  baseURL: process.env.VITE_SPOTIFY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 取得目前使用者的個人資料
 * @see https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
 */
export async function getProfile(): Promise<Spotify.Profile> {
  const response = await axiosInstance.get('/me');
  return response.data;
}

/**
 * 關鍵字搜尋節目
 * @see https://developer.spotify.com/documentation/web-api/reference/search
 */
export async function searchShows({
  keyword,
  country = 'TW',
}: {
  keyword: string;
  country?: string;
}): Promise<Spotify.SearchShowResult> {
  const response = await axiosInstance.get('/search', {
    params: {
      q: `encodeURIComponent(artist:${keyword})`,
      type: 'show',
      market: country,
      limit: 12,
    },
  });
  return response.data;
}

/**
 * 取得多個節目
 * @see https://developer.spotify.com/documentation/web-api/reference/get-multiple-shows
 */
export async function getShows({
  ids = '',
  country = 'TW',
}: {
  ids?: string;
  country?: string;
}): Promise<Spotify.GetShowResult> {
  const response = await axiosInstance.get(
    `/shows?market=${country}&ids=${ids}`
  );
  return response.data;
}

/**
 * 取得單一節目的單集列表
 * @see https://developer.spotify.com/documentation/web-api/reference/get-a-shows-episodes
 */
export async function getShowEpisodes({
  id,
  offset = 0,
}: {
  id: string;
  offset?: number;
}): Promise<Spotify.ShowEpisodesResult> {
  const response = await axiosInstance.get(`/shows/${id}/episodes`, {
    params: { offset },
  });
  return response.data;
}

/**
 * 取得多個單集
 * @see https://developer.spotify.com/documentation/web-api/reference/get-multiple-episodes
 */
export async function getEpisodes({
  ids,
  country = 'TW',
}: {
  ids: string;
  country?: string;
}): Promise<Spotify.GetEpisodesResult> {
  const response = await axiosInstance.get(
    `/episodes?market=${country}&ids=${ids}`
  );

  return response.data;
}
