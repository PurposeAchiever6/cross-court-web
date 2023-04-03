import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
  server: { port: 3000 },
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'shell', replacement: fileURLToPath(new URL('./src/shell', import.meta.url)) },
      {
        find: 'shared',
        replacement: fileURLToPath(new URL('./src/shared', import.meta.url)),
      },
      {
        find: 'external-tools',
        replacement: fileURLToPath(new URL('./src/external-tools', import.meta.url)),
      },
      {
        find: 'screens',
        replacement: fileURLToPath(new URL('./src/screens', import.meta.url)),
      },
      { find: 'assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
    ],
  },
}));
