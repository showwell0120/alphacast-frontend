import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
    EnvironmentPlugin('all'),
  ],
  server: {
    port: 4200,
  },
  build: {
    target: ['edge90', 'chrome90', 'firefox90', 'safari15'],
  },
});
