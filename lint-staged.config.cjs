module.exports = {
  '*.{js,ts,jsx,tsx}': ['npm run lint', 'npm run prettier', 'npm run test'],
  '*.{css,scss,json,md,mdx,html}': ['npm run prettier'],
};
