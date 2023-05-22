import { AxiosInstance } from 'axios';

// 將 token 注入 axios 的 headers
// TODO: save token in local storage
export function injectAuthHeader(axioInst: AxiosInstance, token: string) {
  axioInst.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}
