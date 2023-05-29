import { rest } from 'msw';

// 建立使用者資料
const addUser = rest.post(
  'https://spotify-backend.alphacamp.io/api/users',
  (_req, res, ctx) => {
    return res(ctx.status(409));
  }
);

export const handlers = [addUser];
