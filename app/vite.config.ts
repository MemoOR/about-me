import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Static assets under public/static are already fingerprint-free and reused
    // verbatim from the original Flask app; keep them untouched.
    assetsInlineLimit: 0,
  },
  ssr: {
    // These are loaded as external <script> tags at runtime, never bundled.
    noExternal: [],
  },
});
