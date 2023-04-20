/* eslint-disable import/no-dynamic-require */
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig(() => ({
  server: { port: 3000, open: true },
  plugins: [viteCommonjs(), react()],
  build: {
    outDir: 'build',
    commonjsOptions: {
      defaultIsModuleExports(id) {
        try {
          const module = require(id);
          if (module?.default) {
            return false;
          }
          return 'auto';
        } catch (error) {
          return 'auto';
        }
      },
      transformMixedEsModules: true,
    },
  },
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
      { find: '~', replacement: fileURLToPath(new URL('.', import.meta.url)) },
    ],
  },
}));
