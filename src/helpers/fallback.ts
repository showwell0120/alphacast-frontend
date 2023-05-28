import { AxiosError } from 'axios';

const fallbackStatuses = [401, 403, 500];

export const shouldFallback = (error: AxiosError) => {
  const status = error?.response?.status as number;
  return fallbackStatuses.includes(status);
};
