import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: false,
  optimizeDeps: { noDiscovery: true },
  build: {
    minify: false,
    cssMinify: false,
  },
});
