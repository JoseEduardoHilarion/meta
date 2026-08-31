/*
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
})
*/
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // ← Esto es lo importante
    port: 5173, // o el puerto que uses
  },
});
