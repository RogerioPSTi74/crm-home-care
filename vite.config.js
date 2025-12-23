// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,  // Forçar porta 5173
    host: true,
    open: true   // Abre navegador automaticamente
  }
});