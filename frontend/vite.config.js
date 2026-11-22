import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Forward API calls to the Express backend during development.
    proxy: { '/api': 'http://localhost:5000' },
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    sourcemap: false,
  },
});
