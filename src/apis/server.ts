/**
 * @see https://github.com/showwell0120/ac-frontend-capstone-projects/tree/main/spotify-podcast-player-backend
 */
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.VITE_SERVER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 取得使用者
 */
export async function getUser(): Promise<Server.User> {
  const response = await axiosInstance.post('/me');
  return response.data;
}

/**
 * 建立使用者資料 / 取得新的 API Access Token
 */
export async function initializeUser(
  spotifyToken: string | null
): Promise<Server.User> {
  const response = await axiosInstance.post('/users', {
    spotifyToken,
  });
  return response.data;
}

/**
 * 取得所有分類
 */
export async function getCategories(): Promise<Server.Categories> {
  const response = await axiosInstance.get('/categories');
  return response.data;
}

/**
 * 建立分類
 */
export async function createCategory(
  name: string
): Promise<Server.SuccessResponse> {
  const response = await axiosInstance.post('/categories', { name });
  return response.data;
}

/**
 * 更新分類名稱
 */
export async function updateCategory({
  name,
  id,
}: {
  name: string;
  id: string;
}): Promise<Server.SuccessResponse> {
  const response = await axiosInstance.put(`/categories/${id}`, { name });
  return response.data;
}

/**
 * 移除分類
 */
export async function deleteCategory(
  id: string
): Promise<Server.SuccessResponse> {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
}

/**
 * 在分類下新增節目
 */
export async function addShow({
  categoryId,
  showId,
}: {
  categoryId: string;
  showId: string;
}): Promise<Server.SuccessResponse> {
  const response = await axiosInstance.post(`/categories/${categoryId}/shows`, {
    showId,
  });
  return response.data;
}

/**
 * 在分類下移除節目
 */
export async function deleteShow({
  categoryId,
  showId,
}: {
  categoryId: string;
  showId: string;
}): Promise<Server.SuccessResponse> {
  const response = await axiosInstance.delete(
    `/categories/${categoryId}/shows/${showId}`
  );
  return response.data;
}

/**
 * 收藏單集
 */
export async function addFavorite(
  episodeId: string
): Promise<Server.SuccessResponse> {
  const response = await axiosInstance.post(`/episodes`, {
    episodeId,
  });
  return response.data;
}

/**
 * 從收藏中移除單集
 */
export async function removeFavorite(
  episodeId: string
): Promise<Server.SuccessResponse> {
  const response = await axiosInstance.delete(`/episodes/${episodeId}`);

  return response.data;
}
