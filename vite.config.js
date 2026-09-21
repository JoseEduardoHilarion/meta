import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  test: {
    environment: 'jsdom', // simula el browser
    globals: true, // describe, test, expect sin importar
    setupFiles: './src/test/setup.js',
  },
});
